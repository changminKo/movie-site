import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';


function TestElem() {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const onChangeHandler = (event) => {     
    const currentValue = event.target.value;
    setQuery(currentValue);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if(query) {
      params.append('q', query);
    } else {
      params.delete('q');
    }
    
    history.push({search: params.toString()});
  }, [query, history]);

  return (
    <div>
      <input onChange={onChangeHandler} value={query}/>
    </div>
  )
}

export default TestElem