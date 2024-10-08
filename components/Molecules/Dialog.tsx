interface DialogProps {
  title: string;
  message: string;
}

const Dialog = ({message, title}: DialogProps) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <h3 className='text-xl font-bold text-green-600 mb-4'>{title}!</h3>
        <p className='text-gray-700'>{message}</p>
      </div>
    </div>
  );
};

export default Dialog;
