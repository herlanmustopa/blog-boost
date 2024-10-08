interface DialogProps {
  //   open: boolean;
  message: string;
}

const Dialog = ({message}: DialogProps) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <h3 className='text-xl font-bold text-green-600 mb-4'>{message}!</h3>
        <p className='text-gray-700'>
          Your blog post has been submitted successfully.
        </p>
      </div>
    </div>
  );
};

export default Dialog;
