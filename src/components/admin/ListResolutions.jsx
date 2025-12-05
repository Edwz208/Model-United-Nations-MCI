import useResData from "../../hooks/useResData";
import styles from './ListResolutions.module.css';

const ListResolutions = () => {
  const { data, isLoading, isError } = useResData();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div>
      <h1>Resolutions</h1>
      {data?.map(res => (
        <div key={res.id}>{res.title}</div>
      ))}
    </div>
  );
};

export default ListResolutions;
