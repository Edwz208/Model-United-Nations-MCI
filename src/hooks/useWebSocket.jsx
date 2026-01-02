import { useCallback, useEffect, useRef, useState } from "react";

export default function useWebSocket(
  { reconnectDelayMs = 1000, maxReconnectDelayMs = 15000, shouldReconnect = true, onMessage } = {}
) { // onmessage dependancy was constantly rerendering
  const wsRef = useRef(null);
  const timerRef = useRef(null);
  const mountedRef = useRef(false);
  const retryDelayRef = useRef(reconnectDelayMs);
  const onMessageRef = useRef(onMessage);
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);
  // the function still rerenders, but the ref does not change so websockets does not get affected
  // passing in a function within the component is same as inline because it rerenders everytime the component is rerendered unless memoize
  const [readyState, setReadyState] = useState(WebSocket.CLOSED);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const connect = useCallback(() => {
    clearTimer();

    const existing = wsRef.current;
    if (existing && (existing.readyState === WebSocket.OPEN || existing.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const ws = new WebSocket("ws://localhost:8000/screen");
    wsRef.current = ws;
    setReadyState(ws.readyState);

    ws.onopen = () => {
      retryDelayRef.current = reconnectDelayMs; 
      setReadyState(WebSocket.OPEN);
    };
    ws.onmessage = (e) => {
      let data = e.data;
      try {
        data = JSON.parse(e.data);
      } catch {
        data = "failed"
      }
      onMessageRef.current?.(data) //optional chaining on function
    };

    ws.onerror = () => {
    };

    ws.onclose = (e) => {
      console.log("WS closed:", e.code, e.reason, e.wasClean);
      setReadyState(WebSocket.CLOSED);

      if (!mountedRef.current) return;
      if (!shouldReconnect) return;

      const delay = retryDelayRef.current;
      retryDelayRef.current = Math.min(delay * 1.5, maxReconnectDelayMs);

      timerRef.current = setTimeout(connect, delay);
    };
  }, [reconnectDelayMs, maxReconnectDelayMs, shouldReconnect]);


  useEffect(() => {
    mountedRef.current = true;
    connect();

    return () => {
      mountedRef.current = false;
      clearTimer();
      wsRef.current?.close();
    };
  }, [connect]);

  return ({isOpen: readyState === WebSocket.OPEN});
}
