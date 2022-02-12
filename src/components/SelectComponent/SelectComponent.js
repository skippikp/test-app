import React from 'react';
import { TextField, Autocomplete } from '@mui/material';

const SelectComponent = ({
	onOpen,
	loading,
	options,
	onChange,
	renderOptions,
	label,
	value,
}) => {
	const componentRenderOptions = (props, options) => {
		return (
			<li {...props} key={options.id}>
				{options.label}
			</li>
		);
	};

	return (
		<Autocomplete
			id="select-component"
			onOpen={onOpen}
			value={value}
			onChange={(event, value) => {
				onChange(value);
			}}
			isOptionEqualToValue={(option, value) =>
				option.label === value || option.label === value?.label
			}
			loading={loading}
			options={options}
			sx={{ width: 300 }}
			renderOption={renderOptions ? renderOptions : componentRenderOptions}
			renderInput={(params) => <TextField {...params} label={label} />}
		/>
	);
};

export default SelectComponent;
