import React, { useState, useEffect, useRef } from 'react';
import NoQuote from './noQuote';
import WithQuote from './withQuote';
import css from './index.module.less';

const ChapterTwoTop = ({ activeOutline, comValueUpdate }) => {
  const withQuoteRef = useRef();
  const {
    id,
    data: { noQuote, valueData },
  } = activeOutline;

  const [noQuoteStch, setNoQuoteStch] = useState(true);

  useEffect(() => {
    setNoQuoteStch(noQuote);
  }, [activeOutline]);

  const stchFunc = async (data) => {
    setNoQuoteStch(data);
    const res = await withQuoteRef.current.getWithQuote();
    comValueUpdate(null, null, null, id, { noQuote: data, valueData: res });
  };

  return (
    <div>
      <NoQuote noQuoteStch={noQuoteStch} setNoQuoteStch={(data) => stchFunc(data)} />
      <WithQuote
        id={id}
        ref={withQuoteRef}
        quoteData={valueData}
        noQuoteStch={noQuoteStch}
        comValueUpdate={comValueUpdate}
        setNoQuoteStch={(data) => stchFunc(data)}
      />
    </div>
  );
};

export default ChapterTwoTop;
