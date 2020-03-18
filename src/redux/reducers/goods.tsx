interface IProps {
  type: string;
  payload: IGood[];
}

const INITIAL_STATE: IGoodsState = {
  1: {
    title: 'Пшеница',
    description: 'Описание продукции 1'
  },
  2: {
    title: 'Вино',
    description: 'Описание продукции 2'
  },
  3: {
    title: 'Посуда',
    description: 'Описание продукции 3'
  }
};

export default (state = INITIAL_STATE, { type, payload }: IProps) => {
  switch (type) {
    default:
      return state;
  }
};
