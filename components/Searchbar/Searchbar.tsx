import { InputContainer } from '@components/Input/styles';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { TextInputProps, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import { shadow } from '@global/shadow';
import { ErrorMessage, TextInput, TextInputMasked } from './styles';

type Props<TFieldValues extends FieldValues> = {
  inputRef?: React.Ref<typeof TextInput>;
  inputSize?: number | string;
  onChevronPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;

  iconLeft?: keyof typeof MaterialIcons.glyphMap;
  marginTop?: number;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  includeRawValueInChangeText?: boolean;
  password?: boolean;
} & TextInputProps &
  UseControllerProps<TFieldValues>;

const Searchbar = <TFieldValues extends FieldValues>({
  control,
  name,
  containerStyle,
  iconLeft,
  marginTop,
  type,

  ...props
}: Props<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <>
      <InputContainer
        style={{ ...containerStyle, marginTop, ...shadow.default }}
      >
        {!!iconLeft && (
          <MaterialIcons name={iconLeft} size={24} color="#0369a1" />
        )}
        {type ? (
          <TextInputMasked
            onChangeText={field.onChange}
            refInput={field.ref}
            type={type}
            {...props}
          />
        ) : (
          <TextInput
            onChangeText={field.onChange}
            ref={field.ref}
            onBlur={field.onBlur}
            {...props}
          />
        )}
      </InputContainer>
      <ErrorMessage>{error?.message}</ErrorMessage>
    </>
  );
};

export default Searchbar;
