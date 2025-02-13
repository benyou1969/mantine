import React from 'react';
import { storiesOf } from '@storybook/react';
import { createStyles, MantineProvider } from '@mantine/styles';
import { generateBorderStyles, InputStylesApiWrapper } from '@mantine/ds/src';
import { Input, InputProps } from '../Input';
import { Input as InputStylesApi } from '../styles.api';

const styles = generateBorderStyles(InputStylesApi);
const useStyles = createStyles(() => styles);

function Wrapper(props: Partial<InputProps<'input'>>) {
  return <InputStylesApiWrapper component={Input} data={['React', 'Angular', 'Vue']} {...props} />;
}

function WithClassNames() {
  return <Wrapper classNames={useStyles().classes} />;
}

storiesOf('@mantine/core/Input/styles-api', module)
  .add('With sx', () => (
    <Wrapper sx={{ border: '1px solid red', maxWidth: 400 }} mx="auto" mt="xl" />
  ))
  .add('Root styles object', () => <Wrapper styles={{ wrapper: { border: '1px solid blue' } }} />)
  .add('Root styles function', () => (
    <Wrapper styles={() => ({ wrapper: { border: '1px solid blue' } })} />
  ))
  .add('With styles as object', () => <Wrapper styles={styles} />)
  .add('With styles as function', () => <Wrapper styles={() => styles} />)
  .add('With styles as classNames', () => <WithClassNames />)
  .add('Styles API on MantineProvider', () => (
    <MantineProvider styles={{ Input: () => styles }}>
      <Wrapper />
    </MantineProvider>
  ))
  .add('Custom invalid styles', () => (
    <Input
      placeholder="Invalid input"
      invalid
      sx={{ maxWidth: 400 }}
      mx="auto"
      mt="xl"
      styles={{ invalid: { borderColor: 'blue', '&::placeholder': { color: 'blue' } } }}
    />
  ));
