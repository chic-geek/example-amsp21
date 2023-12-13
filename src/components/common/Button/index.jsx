import PropTypes from 'prop-types';

export default function Button({ handleClick, children }) {
  return (
    <button
      type="button"
      className="py-2 px-4 mx-2 ml-0 md:py-4 md:px-8 md:mx-2 md:mr-0 bg-indigo-700 font-semibold text-white text-xs md:text-base"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func,
  children: PropTypes.node,
};
