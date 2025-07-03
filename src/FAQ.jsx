import React, { useState } from 'react';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is roll call?",
      answer: "Roll call at its most basic simply means that the Chair conducts attendance to make sure that all delegations are present. However, during the roll call in the mornings of both days, delegations are permitted to perform a short skit or present a short video no longer than one minute on a topic relating to their nation or its foreign policies."
    },
    {
      question: "What is a resolution?",
      answer: (
        <>
          <p>The United Nations (UN) passes resolutions, not laws. Since the UN does not have the power to enact concrete laws to govern countries' actions with regard to international issues, it passes resolutions that affirm its stance on issues in question. Passed resolutions apply political pressure on Member States to conform with the UN, express the UN's opinion on an issue and/or recommend what action should be taken by the UN or one of its various sub-divisions. Resolutions can establish committees and set up bodies to further deal with the matter at hand. Resolution topics are decided by the MMUN executive and are written by the executive or members of the resolution writing team. There are usually ten resolutions in the General Assembly (GA), five in each of the two committees and one in the Security Council.</p>
          <p>Each resolution has three parts; the heading, the preambulatory clauses and the operative clauses. The heading introduces the topic of the resolution. The preambulatory clauses supply historical background for the issue and justify the actions the UN aims to take on the matter. The operative clauses present a solution to the problem under debate in the resolution. Operative clauses are sequentially numbered and may recommend, urge, encourage, and request that certain actions be taken.</p>
          <p>Each resolution has a submitter, seconder and negator. The negator wants the resolution to fail, whereas the submitter and seconder want it to pass. These countries will be appointed by the MMUN executive, and their names will appear at the bottom of the resolutions, which delegates will receive in a second package in the new year.</p>
        </>
      )
    },
    {
      question: "How does the Agenda work?",
      answer: (
        <>
          <p>When the MMUN officially opens, the Chair will usually say something along the lines of, "Are there any motions on the floor?" This gives delegates the opportunity to amend the agenda as they see fit. Usually, several delegates will go to the microphones, located at the bottom of the aisles of the auditorium, and await recognition by the Chair. They do so by holding up their country placards and indicating that they rise on a point of order. Once the Chair recognizes a delegate, that delegate may make a motion. For example, the delegate would say, "I rise on a point of order." The Chair would reply, "Please state that point." The delegate would continue with, "I motion to..."</p>
          <p>The delegate might motion to move a resolution to the top of the agenda. The Chair would then take a straw vote (a quick raising of the placards) to test the popularity of the motion, or call for one speaker in favour, and one speaker against it. These speakers would make brief speeches on why the resolution should or should not be moved to the top of the agenda. After the addresses, the motion would be put to a vote. If it passed, the resolution would be moved to the top of the agenda, and debate would automatically open on it. If it failed, another motion could be entertained.</p>
          <p>Once a resolution has been moved to the top of the agenda and debate has opened on it, the submitter reads the resolution aloud, word for word, from the podium. If he chooses, he may make a short speech on the resolution. No points of information (questions directed at the speaker) may be asked of the submitter. When the submitter finishes his speech, the speakers' list is declared open. Any country that wishes to speak on the current resolution should send a page to the Chair at this point, conveying its desire to be on the speakers' list. This list is posted during the seconder's speech.</p>
          <p>The seconder then approaches the platform, and gives a speech supporting the resolution. He may answer an appropriate number of points of information, if he so chooses. If the speaker refuses to answer a question, he forfeits the right to answer any further points of information on that speech.</p>
          <p>After the seconder speaks on the resolution, the negator gives a speech to convince delegates to vote against the resolution. Other countries that wish to talk on the matter then further debate the resolution, based on the order of delegations on the speakers' list.</p>
        </>
      )
    },
    {
      question: "How do I speak?",
      answer: (
        <>
          <p>As a delegate you have three choices when it comes to speaking. You may address the GA in a speech from the podium, you may simply ask questions of other speakers or you may make a motion or speak on a motion.</p>
          <p>If you wish to make an actual address to the GA, you must first have your name placed on the speakers' list. To do so, wait until the Chair opens the Speakers' List, and then send a page to the Chair. For more on the paging system, see question 10.</p>
          <p>If you simply want to ask a question of the speaker at the podium, make your way to the microphones at the front of the auditorium, with your placard. When the Chair acknowledges you, state that you have a point of information. The Chair will then allow you to ask your question if it is an appropriate time. You may not respond to the speaker's reply to your question.</p>
          <p>A delegate can also make a motion, regarding anything from breaking for recess to closing debate on a resolution. Sometimes the Chair will request speakers for and against a proposed motion. This is also an opportunity for a delegate to speak. Raise your placard, and the Chair may call upon you. If you are recognized, you will be asked to approach the platform and give a brief speech on the motion at hand.</p>
        </>
      )
    },
    {
      question: "What is a motion?",
      answer: (
        <>
          <p>A motion is a suggestion to the Chair about what the GA should be doing next, or about how the conference should be proceeding. Motions can pertain to many things, from which resolution should be debated next, to limiting speaking time, to adjourning debate for the day. Motions can only be used to change the schedule and proceedings of the assembly to a certain limit; extravagant motions will not be passed. Any country may make a motion.</p>
          <p>In order to put forth a motion, you must walk up to one of the microphones with your country's placard, and wait to be recognized by the Chair. When the Chair recognizes you ("I recognize the delegate from insert your country here.") you must state your motion, saying something along the lines of "I move/motion that we close debate on resolution GA/001 and move into voting procedures," "I move that resolution GA/001 be brought to the top of the agenda," or "I move for a twenty-minute recess," as the case may be. The Chair will consider your suggestion and then agree or disagree. If the Chair disagrees, you may return to your seat and try again later. If the Chair thinks your motion is appropriate, it will either be passed based on the Chair's judgment alone, or it will be voted upon. Voting on motions is identical to voting on resolutions, except that all countries must vote.</p>
        </>
      )
    },
    {
      question: "Do I have to speak?",
      answer: (
        <>
          <p>You are never required to speak, unless your delegation is submitting, seconding or negating a resolution. However, if the topic under debate concerns your nation, you are expected to present and defend your nation's foreign policy and interests. Since the larger and more powerful countries are involved in politics to a greater degree than less powerful countries, members of such delegations are expected to speak frequently and contribute meaningfully to the debate. The Russian Federation, China and the United States are such nations. Japan, Mexico and Italy are examples of middle powers, whose delegates themselves will dictate the level of their delegation's involvement. The same holds true for small nations such as Liechtenstein, Bermuda and Chad.</p>
          <p>However, in some cases, small nations will be submitting, seconding or negating a resolution, in which case they must be prepared to speak on that resolution. There are also three committees, which provide a less overwhelming atmosphere in which to debate. These committees are excellent places for beginning delegates to speak. Remember, your MMUN experience will be much more rewarding if you get actively involved in the proceedings.</p>
        </>
      )
    },
    {
      question: "What are the committees in MMUN? How do they work?",
      answer: (
        <>
          <p>In addition to the General Assembly (GA), in which every country participates, there are two committees that will occur at MMUN, the Health and Security Councils. Fifteen delegations will be part of each one of these committees, which will be chosen based on the executive's prerogative.</p>
          <p>The Health Council works in an essentially identical way to the GA, taking place in the library on Wednesday Afternoon. Each delegation will send one delegate to the Health Council.</p>
          <p>The Security Council operates differently, however. There are 15 delegations at the Security Council, and each delegation can only send one delegate to the Security Council, with the exception of the permanent/veto members, which may send up to two delegates. The five permanent members of the Security Council possess veto power, and have the ability to veto any resolution in the committee.</p>
        </>
      )
    },
    {
      question: "What should I wear to the MMUN?",
      answer: "Formal dress is required. Most delegates wear standard business attire (suits and ties for men; pantsuits or skirts for women). However, delegates may dress in the traditional clothing of the nation they represent. No country has jeans or running shoes as its traditional garb."
    },
    {
      question: "Are there awards at MMUN? What do I need to do to win an award?",
      answer: (
        <>
          <p>During the afternoon on Wednesday, several awards are presented to both individual delegates and to entire delegations. These awards recognize and reward the students who actively participated in, and thus enhanced, the conference. When choosing award-winners, the executive looks at a delegate's knowledge of her foreign policy and world affairs, the quality of her debate and the impression she has left by her behaviour over the course of the two days.</p>
          <p>Awards are also given for the best roll call and for the 'banana republic' of the conference. The best roll call award is given to the country that gives the most humorous, yet relevant, entrance. The banana republic award is given to a smaller delegation that succeeds in enhancing the conference with a good mixture of strong and amusing, yet relevant and serious, debate. The full list of awards is available below:</p>
          <ul>
            <li>Best Delegation in the General Assembly</li>
            <li>Best Delegate in the General Assembly</li>
            <li>Best Junior Delegate in the General Assembly</li>
            <li>Best Delegate in the Security Council</li>
            <li>Best Delegate in the Health Council</li>
            <li>Banana Republic</li>
            <li>Best Roll Call</li>
            <li>Best Dressed</li>
            <li>Best Page Member</li>
            <li>Best Security Member</li>
            <li>Best Executive Member</li>
          </ul>
        </>
      )
    },
    {
      question: "What is the page system? How do I use it?",
      answer: "The page system is a communication body comprised of message-runners who assist in the smooth operation of the conference. On the notepaper provided, delegates may write memos to the Chair or another delegation and have it delivered by a page. The page system is especially important in enabling delegates to add their delegations to the speaker's list and to question other countries on resolution-related matters. The page system is available in both the GA and the committees but is suspended during voting. The Chair may suspend the page system at its discretion. A note to be delivered must include its sender's name and its destination, legibly written. It is the pages' prerogative to look at the contents of notes and divert them to the Chair if they are inappropriate."
    },
    {
      question: "What are expectations with regards to behaviour at MMUN?",
      answer: (
        <>
          <p>There is a big difference between structured and effective debating, and obnoxious and chaotic arguing. MMUN is a place for debating, not for arguing. Yelling comments or opinions in the assembly is inappropriate. Delegates must either be recognized by the Chair or be on the speaker's list to speak. Delegates may not interrupt another delegate who is speaking, nor may they interrupt the Chair.</p>
          <p>Flags and toy weapons are not allowed in the MMUN. It is the responsibility of the security officers to remove objects forbidden at the conference. Threatening or assaulting other delegates, pages, security officers, or anyone will not be tolerated. The Chair's reactions will depend on the severity of delegates' actions. Delegates who fail to comply with proper procedures or who repeatedly disrupt the assembly will be asked to leave. Security officers may escort them from the assembly, if requested to do so by the Chair.</p>
          <p>In the event of a serious breach of the rules, delegates may be permanently removed from the assembly. Delegates will not be refunded if they are removed for bad behaviour. The executive may also choose to contact principals, teachers or the parents/guardians of delegates whose actions are inappropriate.</p>
          <p>All delegates will be issued a copy of the code of conduct and the procedures of the MMUN. The rules contained therein make the MMUN possible. Actions or delegates that contravene MMUN regulations are a threat to the integrity and very existence of the conference, and will not be tolerated.</p>
        </>
      )
    }
  ];

  return (
    <div style={{marginTop: '50px', width: '40%', padding: '50px', color: 'white', margin: 'auto', backgroundColor: '#222230', borderRadius: '10px'}}>      
      <h1 style={{textAlign: 'center'}}>Martingrove Model UN - FAQ</h1>
      <h4 style={{textAlign: 'center'}}>Martingrove Model United Nations can seem very daunting and confusing to new participants. That is why we have converted our delegate handbook into an FAQ page. This page contains all of the information you will need to know regarding MMUN. If you have any questions, don't hesitate to email us at martingrovemodelun@gmail.com</h4>

      <div style={{marginTop: '30px'}}>
        {faqItems.map((item, index) => (
          <div key={index} style={{marginBottom: '10px', borderBottom: '1px solid #444'}}>
            <button 
              onClick={() => toggleAccordion(index)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '15px',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h3 style={{margin: 0}}>{item.question}</h3>
              <span style={{fontSize: '20px'}}>
                {activeIndex === index ? '−' : '+'}
              </span>
            </button>
            <div 
              style={{
                padding: '0 15px',
                maxHeight: activeIndex === index ? '1000px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease, padding 0.3s ease',
                paddingBottom: activeIndex === index ? '15px' : '0'
              }}
            >
              {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  ); 
}

export default FAQ;
