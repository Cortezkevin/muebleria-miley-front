import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select'
import { FieldArray, useFormikContext, getIn } from 'formik';
import React from 'react'

interface Props {
  name: string;
}

export const FaetureSelector: React.FC<Props> = ({ name }) => {
  const { values, setFieldValue, setFieldTouched, errors, touched, validateForm } = useFormikContext<any>();
  const features = (values[name] as { feature: string; value: string }[]) || [];

  return (
    <FieldArray name={name}>
      {({ push, remove }) => (
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2'>
            <span className='text-md text-default-500'>Agrega especificaciones</span>
            <div className='flex gap-2 items-center'>
              <Select
                size='sm'
                items={[{ id: "1", name: "Material" }, { id: "2", name: "Ancho" }, { id: "3", name: "Alto" }].filter(feature => !features.find(f => f.feature === feature.name))}
                onChange={async e => {
                  const lastIndex = features.length - 1;
                  if (lastIndex >= 0) {
                    await setFieldTouched(`${name}[${lastIndex}].feature`, true);
                    await setFieldTouched(`${name}[${lastIndex}].value`, true);
                    const formErrors = await validateForm();
                    const errorInLast = getIn(formErrors, `${name}[${lastIndex}]`);
                    if (errorInLast?.feature || errorInLast?.value) return;
                  }
                  push({ feature: e.target.value, value: '' });
                }}
                label="Especificacion"
                variant="bordered"
              >
                {(feature) => (
                  <SelectItem key={feature.name}>
                    {feature.name}
                  </SelectItem>
                )}
              </Select>
              <Button
                isIconOnly
                color="primary"
                onPress={async () => {
                  const lastIndex = features.length - 1;
                  if (lastIndex >= 0) {
                    await setFieldTouched(`${name}[${lastIndex}].feature`, true);
                    await setFieldTouched(`${name}[${lastIndex}].value`, true);
                    const formErrors = await validateForm();
                    const errorInLast = getIn(formErrors, `${name}[${lastIndex}]`);
                    if (errorInLast?.color || errorInLast?.images) return;
                  }
                  push({ feature: '', value: '' });
                }}
                variant="flat"
              >
                <i className="fa-solid fa-plus"></i>
              </Button>
            </div>
          </div>
          { features.map((f, index) => {
            const errorFeature = getIn(errors, `${name}[${index}].feature`);
            const touchedFeature = getIn(touched, `${name}[${index}].feature`);

            const errorValue = getIn(errors, `${name}[${index}].value`);
            const touchedValue = getIn(touched, `${name}[${index}].value`);

            const showErrorFeature = Boolean(errorFeature && touchedFeature);
            const showErrorValue = Boolean(errorValue && touchedValue);
            return (
              <div className='flex flex-col gap-2' key={index}>
                <div className='flex gap-2 items-center justify-center w-full'>
                  <Input
                    label="Nombre"
                    variant='bordered'
                    value={f.feature}
                    size='sm'
                    errorMessage={showErrorFeature ? String(errorFeature) : undefined}
                    isInvalid={showErrorFeature}
                    onChange={(e) => {
                      const newFeature = [...features];
                      newFeature[index].feature = e.target.value;
                      setFieldValue(name, newFeature);
                    }}
                    onBlur={() => setFieldTouched(`${name}.${index}.feature`, true)}
                  />
                  <Input
                    label="Valor"
                    value={f.value}
                    variant='bordered'
                    size='sm'
                    onChange={(e) => {
                      const newFeatureValue = [...features];
                      newFeatureValue[index].value = e.target.value;
                      setFieldValue(name, newFeatureValue);
                    }}
                    errorMessage={showErrorValue ? String(errorValue) : undefined}
                    isInvalid={showErrorValue}
                    onBlur={() => setFieldTouched(`${name}.${index}.value`, true)}
                  />
                  <Button variant='flat' isIconOnly color="danger" size='lg' onPress={() => remove(index)}>
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </div>
              </div>
            );
          }) }
        </div>
      )}
    </FieldArray>
  )
}
