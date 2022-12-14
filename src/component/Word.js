import { useState } from "react"

export default function Word({word : w}){ //이렇게 작성해주면 새로운 변수명으로 할당해줄 수 있다.
    console.log(w)
    const [word,setWord] = useState(w);
    const [isShow, setIsShow] = useState(false);
    const [isDone,setIsDone] = useState(word.isDone)

    function toggleShow(){
        setIsShow(!isShow);
    }

    //수정 함수
    function toggleDone(){
        // setIsDone(!isDone);
        fetch(`http://localhost:3001/words/${word.id}`,{
            method : 'PUT', //수정의 정보를 보내줘야 된다.
            headers : {
                'Content-Type' : 'application/json',
                //보내는 리소스의 타입을 의미한다
                //평범한 문자열,html,이미지 등 여러가지가 있을 수 있는데
                //json형태로 전송할 것이다.
            },
            body : JSON.stringify({
                ...word,
                isDone : !isDone
            }),
        }).then(res =>{
            if(res.ok){
                setIsDone(!isDone);
            }
        })
    }

    //삭제함수 -> 삭제는 데이터를 넘겨줄 필요가 없다.
    function del(){
        if(window.confirm("삭제 하시겠습니까")){
            fetch(`http://localhost:3001/words/${word.id}`,{
            method:"DELETE",
        }).then(res =>{
            if(res.ok){
                setWord({id:0})
            }
        })
    }
    }

    if(word.id === 0){
        return null;
    }
    //삭제를 하면 실제로 지워진다. 하지만 페이지에는 아무런 변화가 없다
    //왜냐하면 삭제된 이후에 단어리스트를 렌더링해주지 않았기 때문입니다.
    //이 떄 NULL을 리턴하면 아무것도 표현하지 않습니다.

    return(
        <tr className={isDone ? "off":""}>
        <td>
            <input type="checkbox" checked={isDone} onChange={toggleDone} />
        </td>
        <td>{word.eng}</td>
        <td>{isShow && word.kor}</td>
        <td>
            <button onClick={toggleShow}>뜻 {isShow ? "숨기기": "보기"}</button>
            <button className="btn_del" onClick={del}>삭제</button>
        </td>
    </tr>
    )
}