import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Home } from './routes/Home'
import { PokemonInfo } from './routes/PokemonInfo'
import { PokemonList } from './routes/PokemonList'
import { AiFillHome } from 'react-icons/ai'


export const App = () => {
  return (
    <BrowserRouter>
      <div>
        <div className="">
          <Link to="/" className="">
            <AiFillHome size={50} color={'#FFF'}/>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/PokemonList' element={<PokemonList />}>
            <Route path=':ID' element={<PokemonInfo />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}