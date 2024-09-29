import PropTypes from 'prop-types';

const nuevoMensaje = 'JMCs';
const obj = {
  msj: 'Que P2',
  titulo: 'Man'
}

const PrimoApp = ({titulo, subtitulo}) => {

  return (
    <div>
      <h1>{nuevoMensaje}</h1>
      <code>{JSON.stringify(obj)}</code>
      <h1>{obj.titulo}</h1>
      <h2>{titulo}</h2>
      <h3>{subtitulo}</h3>
    </div>
  )
}

export default PrimoApp

PrimoApp.propTypes={
  titulo: PropTypes.string.isRequired,
  subtitulo: PropTypes.number.isRequired,
}

PrimoApp.defaultProps = {
  titulo: 'No hay titulo',
  subtitulo: 'No hay subtitulo',
}