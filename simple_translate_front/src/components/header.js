import sc_logo from '../assets/symbol-solid.png'

export const Header = () => {
  return (
    <div className="header">
      <img src={sc_logo} />{' '}
      <h1>
        <span>GBSW</span> 학생용 번역기
      </h1>
    </div>
  )
}
