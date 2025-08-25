import { Address, Cell } from '@ton/core';

const t = 'b5ee9c72010101010024000043801622753296a04942ce33ed2272651d6eb2b2d87144beb2051628dfd9b86c43bfd0';

const cell = Cell.fromHex(t);

function loadAddressFromCell(cell: Cell): Address {
  const slice = cell.beginParse();
  const address = slice.loadAddress();
  return address;
}

try {
  const address = loadAddressFromCell(cell);
  console.log('Адрес:', address.toString());
  console.log('Адрес в формате raw:', address.toRawString());
  console.log('Адрес в формате friendly:', address.toString({ urlSafe: true, bounceable: true }));
} catch (error) {
  console.error('Ошибка при чтении адреса:', error);
}
