import React, {memo, useCallback, useEffect, useRef, useState} from 'react'

interface ITags {
  id: number;
  name: string;
  color: string;
}

const App = () => {
  const [tags, setTags] = useState<ITags[] | null>(null)
  const [val, setVal] = useState<string>("");
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const updateRef = useRef<boolean>(true);

  const searchTags = useCallback(() => {
    // setTags(prev => {
    //   // return prev?.filter(item => item.id === )
    // })
  }, []);

  useEffect(() => {
    if (!updateRef.current) {
      if (val.length === 0) {
        updateRef.current = true;
      }
    } else {
      updateRef.current = false;
      return;
    }
    if (val.length === 0) {
      setIsUpdated(false);
    } else {
      setIsUpdated(true);
    }
  }, [val]);  

  useEffect(() => {
    const savedTags = JSON.parse(localStorage.getItem("tags")!);
    if (savedTags) {
      setTags(savedTags);
    }
  }, []);
  
  return (
    <div>
      <input type="text" onChange={e => {
        setVal(e.target.value);
      }} />
     {
      isUpdated &&
        <ul className='tags-list'>
          {
            tags?.map(item => {
              const {id, name, color} = item;
              return <li key={id}>
                <div  className='tag-color'>{name}</div>
              </li>
            })
          }
        </ul>
     }
    </div>
    
  )
}

export default memo(App);