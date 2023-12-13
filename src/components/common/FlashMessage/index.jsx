import PropTypes from 'prop-types';

export default function FlashMessage({ type, message, instruction }) {
  const commonClasses = 'px-6 py-4 border text-xs font-medium uppercase tracking-wider text-white';

  if (type === 'success') {
    return (
      <div className={`${commonClasses} border-green-700`}>
        <strong className="text-green-600">{message}</strong>{' '}{instruction}
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className={`${commonClasses} border-red-700`}>
        <strong className="text-red-600">{message}</strong>{' '}{instruction}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  instruction: PropTypes.string,
};
