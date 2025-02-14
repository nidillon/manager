import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { Box } from 'src/components/Box';
import { IconButton } from 'src/components/IconButton';
import { LinkButton } from 'src/components/LinkButton';
import { Stack } from 'src/components/Stack';
import { TextField } from 'src/components/TextField';

import type { CreateLinodeRequest } from '@linode/api-v4';

export const VPCRanges = () => {
  const { control } = useFormContext<CreateLinodeRequest>();

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'interfaces.0.ip_ranges',
  });

  return (
    <Stack spacing={1}>
      {fields.map((field, index) => (
        <Stack
          alignItems="flex-start"
          direction="row"
          key={field.id}
          spacing={0.5}
        >
          <Controller
            render={({ field, fieldState }) => (
              <TextField
                errorText={fieldState.error?.message}
                hideLabel
                label={`IP Range ${index}`}
                onChange={field.onChange}
                placeholder="10.0.0.0/24"
                value={field.value}
              />
            )}
            control={control}
            name={`interfaces.0.ip_ranges.${index}`}
          />
          <IconButton
            aria-label={`Remove IP Range ${index}`}
            onClick={() => remove(index)}
            sx={{ padding: 0.75 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      ))}
      <Box>
        <LinkButton onClick={() => append('')}>Add IPv4 Range</LinkButton>
      </Box>
    </Stack>
  );
};
