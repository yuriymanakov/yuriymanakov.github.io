import React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form'
import { withRouter } from 'react-router-dom';

import { addWarehouse, editWarehouse, deleteWarehouse } from '@redux/actions/warehouses';

import { activeWarehouseGoodsSelector, IMatchParams, unallocatedGoodsSelector } from '@redux/selectors';

import {
  Form,
  Input,
  Button,
  Card
} from 'antd';

import './styles.less';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import UnallocatedGoods from './UnallocatedGoods';
import { RouteComponentProps } from 'react-router';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IOwnProps = RouteComponentProps<IMatchParams> & {
  isNew: boolean;
  id?: number;
  data?: IWarehouse;
}

type IProps = StateProps & DispatchProps & FormComponentProps & IOwnProps;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
};

interface IValues extends IWarehouseEditRequest {
  unallocatedGoodsRequest: number[]
}

const formatData = (data: IValues, unallocatedGoods: IUnallocatedGood[]) => {
  return {
    ...data,
    unallocatedGoodsRequest: Object.keys(unallocatedGoods)
      .reduce((goods: IWarehouseUnallocatedGoodsRequest, key) => {
        const value = data.unallocatedGoodsRequest[+key];

        if(value) {
          goods[+key] = data.unallocatedGoodsRequest[+key];
        }

        return goods;
      }, {})
  }
}

class WarehouseEditForm extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { form, isNew, id, addWarehouse, editWarehouse, unallocatedGoods } = this.props;

    form.validateFieldsAndScroll((errors: IFormFieldError[], values: IValues) => {
      const data = formatData(values, unallocatedGoods);

      if (!errors) {
        isNew ?
          addWarehouse(data) :
          editWarehouse(+(id!), data);
        form.resetFields();
      } else {
        console.log(errors);
      }
    });
  };

  private handleDelete() {
    const { deleteWarehouse, id } = this.props;

    deleteWarehouse(+id!);
  }

  componentWillUpdate(nextProps: IProps) {
    if(nextProps.id !== this.props.id) {
      this.props.form.resetFields();
    }
  }

  render () {
    const { form, isNew, id, data, unallocatedGoods } = this.props;
    const { getFieldDecorator } = form;
    const title = isNew ? 'Создание склада' : `Редактирование склада #${id}`;

    console.log('OOOOOOOOOOOOOOOOOOOOOOO');
    console.log(this.props.goods);

    return (
      <Card title={title}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Title">
            {getFieldDecorator('data[title]', {
              initialValue: (!isNew && data) ? data.title : '',
              normalize: value => value.trim(),
              rules: [
                { required: true, message: 'Please input warehouse title!' },
                { max: 10, message: 'Max length!' }
              ],
            })(
              <Input/>,
            )}
          </Form.Item>
          <Form.Item label="Address">
            {getFieldDecorator('data[address]', {
              initialValue: (!isNew && data) ? data.address : '',
              rules: [{ required: true, message: 'Please input warehouse address!' }],
            })(
              <Input/>,
            )}
          </Form.Item>
          <UnallocatedGoods goods={unallocatedGoods} form={form} />
          <Form.Item {...tailFormItemLayout}>
            <Button type="danger" onClick={this.handleDelete}>
              Delete
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
};

const mapStateToProps = (states: IReducerStates, ownProps: IOwnProps) => ({
  unallocatedGoods: unallocatedGoodsSelector(states),
  goods: activeWarehouseGoodsSelector(states, ownProps)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addWarehouse: (data: IWarehouseEditRequest) => dispatch(addWarehouse(data)),
  editWarehouse: (id: number, data: IWarehouseEditRequest) => dispatch(editWarehouse(id, data)),
  deleteWarehouse: (id: number) => dispatch(deleteWarehouse(id)),
});

const WrappedWarehouseEditForm = Form.create<IProps>({ name: 'warehouse_edit' })(WarehouseEditForm);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedWarehouseEditForm));


