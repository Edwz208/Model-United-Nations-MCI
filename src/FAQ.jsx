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
    <div style={{width: '40%', padding: '50px', color: 'white', margin: 'auto'}}>
      <title>Martingrove Model UN - FAQ</title>
      
      <h1 style={{textAlign: 'center', position: 'relative'}}>FAQ</h1>
      <p>Martingrove Model United Nations can seem very daunting and confusing to new participants. That is why we have converted our delegate handbook into an FAQ page. This page contains all of the information you will need to know regarding MMUN. If you have any questions, don't hesitate to email us at martingrovemodelun@gmail.com</p>

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

      <div style={{marginTop: '50px'}}>
        <h1>Martingrove Model UN - Rules of Conduct</h1>
        
        <p>This page contains the rules of conduct for Martingrove Model UN. These rules apply to the general assembly and each of the councils. The rules of conduct include topics regarding the proceedings of MMUN and the expected behaviour of delegates.</p>

        <h2>Powers of the President</h2>
        <p>In addition to exercising the powers conferred on him/her elsewhere in these rules, the President shall declare the opening and closing of each meeting of the General Assembly, direct the discussion during the session, ensure the observance of these rules, accord the right to speak and announce decisions. He or she shall rule on points of order, and have complete control of the proceedings of the General Assembly and the responsibility of the maintenance of order therein.</p>

        <h2>Appeals</h2>
        <p>A delegate may appeal a ruling, if permitted by the President. The appeal must be seconded and shall be put to a vote immediately without debate. The appeal shall be deemed both an important question and a privileged motion. Appeals may not be appealed. The President may rule an appeal dilatory if it is clearly without purpose.</p>

        <h2>Quorum</h2>
        <p>A simple majority of the existing member states of the General Assembly shall constitute a quorum.</p>

        <h2>Absence of Quorum</h2>
        <p>During the absence of a quorum the only item that may be considered shall be a motion for recess for the purpose of finding a quorum.</p>

        <h2>Roll Call</h2>
        <p>At the beginning of each meeting, the President shall take the roll call of the delegations. He or she may call the roll or take a simple count of the delegations at any point if the existence of a quorum should seem in doubt. Individual attendance will be taken during the proceedings.</p>

        <h2>Silent Prayer or Meditation</h2>
        <p>Immediately after the opening of each annual session of the General Assembly, the President shall invite the delegates to observe only one minute of silence devoted to prayer or meditation. This shall occur following the completion of national anthem.</p>

        <h2>Language</h2>
        <p>English is the language of the General Assembly. No translation will be provided. Delegates may, however, address the Assembly in any other language if they provide translation into English. Any delegate familiar with the language being spoken should point out substantial discrepancies between text and translation as points of order.</p>

        <h2>Recognition</h2>
        <p>To be recognised by the Chair, a delegate must rise and address the Chair, as Mr./Madame President. If recognised, the delegate must state the nature of his or her point, once again beginning by addressing the Chair. If a delegate fails to address the Chair properly, the President will rule him or her out of order.</p>

        <h2>Expulsion of Disorderly Delegates</h2>
        <p>If a delegate becomes disorderly during a meeting, or is deemed out of order an excessive number of times, the President may permanently expel the delegate from the meeting.</p>

        <h2>Suspension of a Meeting</h2>
        <p>If a majority of the Assembly becomes disorderly during a meeting, the President may suspend the meeting.</p>

        <h2>Privileged Motions</h2>
        <p>A privileged motion deals with procedure and takes precedence over the resolution and amendments pertaining to it. The Assembly must second such a motion in order for it to receive consideration. One privileged motion cannot be imposed on another. No abstentions are permitted in the vote on a privileged motion.</p>

        <h2>Introduction of Motions</h2>
        <p>A motion is made through a point of order. Only delegates with speaking rights may make motions. No motion pertaining to a resolution or amendment may be introduced until the proposer has read aloud, and in full, the resolution or amendment.</p>

        <h2>Order of Precedence of Privileged Motions</h2>
        <table>
            <tr>
                <th>Motion</th>
                <th>Rule Number</th>
            </tr>
            <tr>
                <td>Appeals</td>
                <td>14</td>
            </tr>
            <tr>
                <td>Recess</td>
                <td>15</td>
            </tr>
            <tr>
                <td>Adjournments</td>
                <td>16</td>
            </tr>
            <tr>
                <td>Closure of Debate</td>
                <td>17</td>
            </tr>
            <tr>
                <td>Shelving</td>
                <td>18</td>
            </tr>
            <tr>
                <td>Censure</td>
                <td>19</td>
            </tr>
            <tr>
                <td>Amendments</td>
                <td>20, 21, 22</td>
            </tr>
        </table>

        <h3><span className="rule-number">14.</span> Appeals</h3>
        <p>A delegate may appeal a decision of the President, if he or she permits (see Rule 2,. Appeals). An appeal is a privileged motion.</p>

        <h3><span className="rule-number">15.</span> Recess</h3>
        <p>A delegate may move for a recess or a lunch break at an appropriate point in the proceedings, or for the purpose of caucusing immediately before a vote on a resolution. A motion to recess, if carried, shall cause the immediate cessation of all work of the Assembly. The proceedings of the Assembly will be resumed at the termination of the recess. A motion for recess is a privileged motion.</p>

        <h3><span className="rule-number">16.</span> Adjournment</h3>
        <p>A delegate may move for adjournment of the current session of the Assembly at an appropriate point on the final day of the proceedings. A motion for the adjournment, if carried, shall cause the immediate cessation of all work of the Assembly. The proceedings of the Assembly will resume at the beginning of the next annual session.</p>

        <h3><span className="rule-number">17.</span> Closure of Debate</h3>
        <p>A delegate may, at any time, move for closure of debate on the resolution which is then before the Assembly. If closure is declared, through a debate followed by a vote, debate on the resolution under consideration shall cease and voting on said resolution will commence. Closure of debate on the resolution requires one speaker for and one against. Closure of debate cannot be imposed on another privileged motion.</p>

        <h3><span className="rule-number">18.</span> Shelving of a Resolution</h3>
        <p>A motion to shelve a resolution shall, if carried, cause all consideration of the resolution before the assembly to cease immediately. The resolution will be considered further at some later point. No vote is taken on a resolution after a motion to shelve. Debate on the motion shall be limited to one speaker in favour, and two speakers against. Shelving cannot be imposed on another motion or if there are amendments or speakers pending.</p>

        <h3><span className="rule-number">19.</span> Censure</h3>
        <p>A delegate may move for the censure of another delegate, or of a delegation, if he or she feels that the delegate or delegation has been consistently and purposely out of order. Debate on a motion of censure is limited to one speaker in favour and two against. This is a privileged motion. If a delegate or delegation is censured, the delegate or delegation must immediately leave the Assembly. This is a very important motion and should be considered carefully.</p>

        <h3><span className="rule-number">20.</span> Amendments</h3>
        <p>Motions to delete, amend or revise parts of a resolution are considered to be amendments. Neither the preamble of a resolution, nor another amendment may be amended. Also, starting this year, there is a limit of 3 amendments to every resolution.</p>

        <h3><span className="rule-number">21.</span> Moving Amendments</h3>
        <p>Only a delegate speaking before the Assembly (through the use of the speaker's list) may move an amendment to the resolution. The Chair must have a written copy of the amendment prior to its submission. Debate on such an amendment shall take precedence over debate on the resolution being amended. If the submitter of the resolution adopts the resolution immediately, it will not require a seconder and will become part of the resolution at hand. If the amendment is not friendly, then upon receiving a seconder, the President shall call upon one speaker in favour and one against and the amendment may then be adopted by a simple majority of the Assembly. Once an amendment is moved, the delegate may not take points of information.</p>

        <h3><span className="rule-number">22.</span> Copies of Amendments</h3>
        <p>The President must receive a clear written copy of any amendment brought before the Assembly prior to its submission.</p>

        <h3><span className="rule-number">23.</span> Dilatory Motions</h3>
        <p>The President may rule out of order any motion that is dilatory, or without purpose in the eyes of the Chair.</p>

        <h3><span className="rule-number">24.</span> Withdrawal of Resolutions</h3>
        <p>Its proposer may withdraw a resolution, motion or other proposal at any time before voting, providing that there are no speeches or amendments pending.</p>

        <h3><span className="rule-number">25.</span> Limitation of Motions</h3>
        <p>The President reserves the right to limit motions if he/she determines that delegates are using them to delay or confuse the proceedings.</p>

        <h2>Point Making</h2>
        <p>Any delegate, provided he or she has speaking rights before the Assembly, may make points to the Assembly. Points may not be made during a voting procedure, or once the Assembly has decided on recess or adjournment.</p>

        <h2>Order of Precedence of Points</h2>
        <table>
            <tr>
                <th>Point</th>
                <th>Rule Number</th>
            </tr>
            <tr>
                <td>Point of Order</td>
                <td>28</td>
            </tr>
            <tr>
                <td>Point of Personal Privilege</td>
                <td>29</td>
            </tr>
            <tr>
                <td>Point of Information</td>
                <td>30</td>
            </tr>
        </table>

        <h3><span className="rule-number">28.</span> Point of Order</h3>
        <p>A delegate may rise on a point of order if he or she feels that some irregularity in the procedure has occurred. A delegate making a point of order may not speak on the substance of a proposal under consideration. The President shall rule on all points of order. Points of order are also used to introduce a motion.</p>

        <h3><span className="rule-number">29.</span> Point of Personal Privilege</h3>
        <p>A delegate may rise on a point of personal privilege if he or she feels that his or her person, or country, has been misquoted, misconstrued or insulted by the speaker holding the floor. The President may ask the allegedly offending delegate if he or she wishes to apologize. The offending delegate is not required to do so.</p>

        <h3><span className="rule-number">30.</span> Point of Information</h3>
        <p>A delegate may rise immediately after another delegate's speech on a resolution, to question the speaker holding the floor on the substance of the speech before the Assembly. The speaker may choose to refuse to answer all questions. In addition, in the eyes of the Chair, if the speaker does not give a satisfactory answer he or she, forfeits the right to any further questions. Points of information are not opportunities for a delegate to refute a speaker's point, nor are they permitted in regards to procedural matters. A point of information consists of one sentence preamble and one sentence in which a specific question is put to the delegate. The President shall permit points of information to speakers according to their importance to the resolution being debated.</p>

        <h3><span className="rule-number">31.</span> Limitation of Points</h3>
        <p>The President reserves the right to limit points if he or she determines that delegates are using them to delay or confuse the proceedings.</p>

        <h2>Speaking Rights</h2>
        <p>No delegate may address the Assembly without having received the permission of the President. The President may rule a speaker out of order if his or her remarks are not relevant to the subject under discussion.</p>

        <h3><span className="rule-number">32.</span> Interruption of Speakers</h3>
        <p>A delegate may interrupt a speaker who has the floor only on a point of order or on a point of personal privilege.</p>

        <h3><span className="rule-number">33.</span> Time Limit on Speeches</h3>
        <p>The President reserves the right to limit the amount of time the speaker has to make a speech and/or answer points of information, either collectively or individually.</p>

        <h3><span className="rule-number">34.</span> Speakers' List</h3>
        <p>After the submitter has presented a resolution, the President shall declare the speakers' list open. Delegates wishing to speak on the subject under discussion shall signify their desire through written notes to the Chair. Notes received before the speakers' list is declared open shall be ignored.</p>

        <h3><span className="rule-number">35.</span> Order of Speaking</h3>
        <p>The order of speaking on a resolution shall consist of the submitter, the seconder, and the negator, followed by the first delegation on the speakers' list.</p>

        <h3><span className="rule-number">36.</span> Speaking Procedure</h3>
        <p>The submitter shall read the resolution and present a short speech in support, if he or she wishes. The submitter shall not be asked any questions. The seconder, negator and other speakers shall present a speech on the resolution and may choose to respond to points of information.</p>

        <h2>Voting Rights</h2>
        <p>Each member nation of the General Assembly shall have one vote. Nations and entities with observer status do not have a vote.</p>

        <h3><span className="rule-number">37.</span> Voting Procedures</h3>
        <p>Delegates shall vote by displaying conspicuously the placard of their countries. Only one delegate per delegation, holding one placard, is permitted to raise the placard during voting. Only delegations recognized as representative of member nations by the United Nations may vote.</p>

        <h3><span className="rule-number">38.</span> Conduct During Voting</h3>
        <p>After the President has announced the beginning of voting, no delegate may interrupt except on a point of order relating directly to voting procedure.</p>

        <h3><span className="rule-number">39.</span> Roll Call Vote</h3>
        <p>A delegate may request that a roll call vote be taken, by making a motion to that effect. If the motion is seconded, the name of each member nation shall be called during the vote, and each delegation shall announce its vote in response. To save time, the President may rule such requests out of order.</p>

        <h3><span className="rule-number">40.</span> Clause by Clause Vote</h3>
        <p>A delegate may request a clause by clause vote on the resolution under discussion. If the submitter and the seconder of the resolution accept this motion, the motion will be considered passed. Otherwise, debate is limited to one speaker in favour, and one speaker against. A clause by clause vote applies only to the operative clauses of a resolution. If any one operative clause is passed by a vote, the entire preamble is considered adopted. There cannot be a clause by clause roll call vote and in order to save time, the President may rule requests for clause by clause votes out of order.</p>

        <h3><span className="rule-number">41.</span> Explanation of Vote</h3>
        <p>A delegate may explain his or her vote on a resolution immediately after the result of the voting has been declared, provided that he or she requests this of the President before voting commences. Delegations may also request that other countries explain their vote. Delegations which have already spoken on the resolution, are not accorded this privilege. These requests shall be made as a point of order. To save time, the President may rule such requests out of order.</p>

        <h3><span className="rule-number">42.</span> By-Passing Voting</h3>
        <p>If any motion requires a speaker on both sides of the issue, and there is no speaker willing to assume the negative role, the motion will be considered passed by the Assembly without the need for a vote.</p>

        <h2>Presence of Flags</h2>
        <p>Within the chambers or assemblies of the United Nations, all nations shall be considered equal and worthy of a neutral atmosphere where every member state shall be given the utmost respect. This implies that all nations agree to co-exist through the dismissal of national aggressions, so that progress may be made. As a symbol of the willingness to unite under the authority of the United Nations, and a show of respect to co-members, no delegates will be allowed to bring flags into the General Assembly or committees of the United Nations.</p>

        <h2>Foreign Policy</h2>
        <p>Participation in the Martingrove Model United Nations implies a willingness on the part of the delegates to represent their nations. A delegate may rise on a point of order if he or she feels that a delegation has committed a serious breach of his or her country's foreign policy. A delegate rising on such a point shall warrant the attention of the Assembly. If the allegedly offending delegate cannot substantiate successfully his or her actions, the Chair may rule the delegate out of order. The President may call a brief recess to consider the points of view involved before rendering a decision.</p>
      </div>
    </div>  
  ); 
}

export default FAQ;