import * as React from 'react';
import { KeyCodes, createArray, getRTLSafeKeyCode } from '@fluentui/react/lib/Utilities';
import { useConst } from '@uifabric/react-hooks';
import { TextField } from '@fluentui/react';
import { Link } from '@fluentui/react/lib/Link';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { DetailsRow, IColumn, Selection, SelectionMode } from '@fluentui/react/lib/DetailsList';

const ITEMS = createArray(10, index => ({
  key: index.toString(),
  name: 'Item-' + index,
  url: 'http://placehold.it/100x' + (100 + index!),
}));

const COLUMNS: IColumn[] = [
  {
    key: 'name',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
  },
  {
    key: 'link',
    name: 'Link',
    fieldName: '',
    minWidth: 100,
    onRender: item => <Link href={item.url}>{item.url}</Link>,
  },
  {
    key: 'textfield',
    name: 'Link',
    fieldName: '',
    minWidth: 130,
    onRender: item => <TextField readOnly defaultValue={'ReadOnly ' + item.name} />,
  },
  {
    key: 'textfield2',
    name: 'Link2',
    fieldName: '',
    minWidth: 130,
    onRender: item => <TextField defaultValue={item.name} />,
  },
];

export const FocusZoneListExample: React.FunctionComponent = () => {
  //  Initialize the selection when the component is first rendered (same instance will be reused)
  const selection = useConst(() => {
    const sel = new Selection();
    sel.setItems(ITEMS);
    return sel;
  });

  return (
    <FocusZone
      direction={FocusZoneDirection.vertical}
      isCircularNavigation={true}
      shouldEnterInnerZone={_shouldEnterInnerZone}
      role="grid"
    >
      {ITEMS.map((item, index) => (
        <DetailsRow
          key={item.name}
          item={item}
          itemIndex={index}
          columns={COLUMNS}
          selectionMode={SelectionMode.none}
          selection={selection}
          styles={{ root: { display: 'block', width: '100%' } }}
        />
      ))}
    </FocusZone>
  );
};

function _shouldEnterInnerZone(ev: React.KeyboardEvent<HTMLElement>): boolean {
  return ev.which === getRTLSafeKeyCode(KeyCodes.right);
}
