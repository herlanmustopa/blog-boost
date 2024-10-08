interface SelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  categories: string[];
}

export default function Select({
  label,
  value,
  onChange,
  error,
  categories,
}: SelectProps) {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <select
        name='category'
        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
        onChange={onChange}
        value={value}>
        <option value=''>Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  );
}
