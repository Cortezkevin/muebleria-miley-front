import { Button } from '@heroui/button'
import { Listbox, ListboxItem } from '@heroui/listbox';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover'
import React, { FC } from 'react'

type Props = {
  onOpen: () => void;
  onClose: () => void;
  isDeleted: boolean;
  isEnabled: boolean;
  onClickEdit: () => void;
  onClickDelete: () => void;
  onClickRestore: () => void;
  onClickDisable: () => void;
  onClickEnable: () => void;
}

export const UserActions: FC<Props> = ({
  isDeleted,
  isEnabled,
  onOpen,
  onClose,
  onClickDelete,
  onClickDisable,
  onClickEdit,
  onClickEnable,
  onClickRestore
}) => {
  return (
    <Popover placement="bottom" showArrow={true} backdrop='opaque' onOpenChange={isOpen => isOpen && onOpen()}>
      <PopoverTrigger>
        <Button /* onPress={onOpen} */>Actions</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Listbox aria-label="Listbox menu with icons" variant="faded">
          <ListboxItem 
            key="Edit" 
            color='warning'
            className="text-warning"
            onPress={ onClickEdit }
            startContent={<i className="fa-solid fa-pen-to-square" />}
            >
            Edit
          </ListboxItem>
          { 
            isEnabled
              ? (
                <ListboxItem
                  key="Disable"
                  color="danger"
                  className="text-danger"
                  onPress={ onClickDisable }
                  startContent={<i className="fa-solid fa-ban"></i>}
                >
                  Disable
                </ListboxItem>
              )
              : (
                !isDeleted 
                ? (
                  <ListboxItem 
                  key="Enable" 
                  startContent={<i className="fa-solid fa-check"></i>}
                  onPress={ onClickEnable }
                  >
                    Enable
                  </ListboxItem>
                )
                : (<></>)
              )
          }

          {
            isDeleted
              ? (
                <ListboxItem
                  key="Restore"
                  className="text-primary"
                  color="primary"
                  onPress={ onClickRestore }
                  startContent={<i className="fa-solid fa-trash-arrow-up"></i>}
                >
                  Restore
                </ListboxItem>
              )
              : (
                <ListboxItem
                  key="Delete"
                  className="text-danger"
                  color="danger"
                  onPress={ onClickDelete }
                  startContent={<i className="fa-solid fa-trash" />}
                >
                  Delete
                </ListboxItem>
              )
          }
        </Listbox>
      </PopoverContent>
    </Popover>
  )
}
