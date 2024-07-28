import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, Select } from '@mantine/core';

const AddNewAddress = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add new address">
        <Select>
          <option>Hungary</option>
        </Select>
      </Modal>

      <Button onClick={open}>Add new address</Button>
    </>
  );
};

export default AddNewAddress;
