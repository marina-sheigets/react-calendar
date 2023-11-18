import './Input.scss';

interface IInput {
	error: boolean;
	required?: boolean;
	value: string;
	onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	label: string;
	min?: string | number;
	max?: string | number;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	classes?: string;
}

function Input({
	disabled,
	classes,
	error,
	required,
	value,
	onChange,
	type = 'text',
	label,
	max,
	min,
	onKeyDown,
}: IInput) {
	return (
		<div className='input-wrapper'>
			<label>
				{label}
				{required ? ' *' : null}
			</label>
			<input
				disabled={disabled}
				onKeyDown={onKeyDown}
				min={min}
				max={max}
				className={`input ${error && 'error'} ${classes}`}
				value={value}
				onChange={onChange}
				type={type}></input>
		</div>
	);
}

export default Input;
