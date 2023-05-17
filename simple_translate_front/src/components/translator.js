import React, { useState } from 'react'
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import { Header } from './header'

const Translator = () => {
  const [srcText, setSrcText] = useState({
    text: '',
    source_lang: '',
    target_lang: 'en',
  })
  const [transText, setTransText] = useState('')
  const [loading, setLoading] = useState({ show: false })

  const onChangeText = (e) => {
    setSrcText({
      ...srcText,
      text: e.target.value,
    })
  }

  const onChangeSrc = (e) => {
    setSrcText({
      ...srcText,
      source_lang: e.target.value,
    })
  }

  const onChangeTar = (e) => {
    setSrcText({
      ...srcText,
      target_lang: e.target.value,
    })
  }

  const translate = async () => {
    setLoading({ show: true })
    setTransText('')
    const translate = await fetch(
      `http://localhost:8000/translate?text=${srcText.text}&target_lang=${srcText.target_lang}&source_lang=${srcText.source_lang}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application.json' },
      }
    )
      .then((res) => res.json())
      .catch((e) => console.log(e))

    setTransText(translate.message.result.translatedText)
    setLoading({ show: false })
  }

  return (
    <div className="translator">
      <Header />
      <div className="src-tar-select">
        <select onChange={onChangeSrc}>
          <option value="">언어 감지</option>
          <option value="ko">한국어</option>
          <option value="en">영어</option>
          <option value="zh-CN">중국어 - 간체</option>
          <option value="zh-TW">중국어 - 번체</option>
          <option value="ja">일본어</option>
          <option value="vi">베트남어</option>
          <option value="id">인도네시아어</option>
          <option value="de">독일어</option>
          <option value="fr">프랑스어</option>
          <option value="ru">러시아어</option>
          <option value="th">태국어</option>
        </select>
        <select onChange={onChangeTar}>
          <option value="en">영어</option>
          <option value="ko">한국어</option>
          <option value="zh-CN">중국어 - 간체</option>
          <option value="zh-TW">중국어 - 번체</option>
          <option value="ja">일본어</option>
          <option value="vi">베트남어</option>
          <option value="id">인도네시아어</option>
          <option value="de">독일어</option>
          <option value="fr">프랑스어</option>
          <option value="ru">러시아어</option>
          <option value="th">태국어</option>
        </select>
      </div>
      <div>
        <div className="src-lang">
          <textarea
            placeholder="번역할 내용 입력"
            onChange={onChangeText}
          ></textarea>
          <button onClick={translate}>번역하기</button>
        </div>
        <div className="result-text">
          <textarea value={transText} disabled></textarea>
          <Loading className="loading-bar" show={loading.show} color="blue" />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Translator)
