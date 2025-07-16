// LIBS
import { Form, Formik, Field } from 'formik';

// GLOBAL COMPONENTS
import { Modal } from '@components/Modal';

// TYPES
import type { GuaranteeEditProps } from './utils/types';

export const GuaranteeEdit = ({ open, onClose, guarantee, onSave }: GuaranteeEditProps) => {
  if (!open || !guarantee) return null;

  return (
    <Modal title="Editar garantia" setModal={onClose}>
      <Formik
        initialValues={guarantee}
        onSubmit={(values) => {
          onSave(values);
          onClose();
        }}
      >
        {() => (
          <Form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p>
                Descrição
                <Field id="description" name="description" as="textarea" />
              </p>

              <p>
                Falhas
                <Field id="failures" name="failures" as="textarea" />
              </p>

              <p>
                Prazo
                <Field id="term" name="term" />
              </p>

              <p>
                Fonte
                <Field id="source" name="source" />
              </p>

              <p>
                Observação
                <Field id="observation" name="observation" as="textarea" />
              </p>

              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button type="button" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit">Salvar</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
