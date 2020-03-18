import React, { EventHandler, FormEvent } from 'react';

import { FormComponentProps } from 'antd/lib/form/Form'

import {
  Form,
  Input,
  Button,
  Card,
  Collapse
} from 'antd';

import './styles.less';

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

interface IProps extends FormComponentProps {
  isNew: boolean;
  id?: number;
  data?: IGood;
}

interface IFormValues extends IGood {
  
}

class GoodEditForm extends React.Component<IProps> {
  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((errors: IFormFieldError[], values: IFormValues) => {
      if (!errors) {
        console.log('Received values of form: ', values);
      }
    });
  };

  componentWillUpdate(nextProps: IProps) {
    if(nextProps.id !== this.props.id) {
      this.props.form.resetFields();
    }
  }

  render () {
    const { form, isNew, id, data } = this.props;
    const { getFieldDecorator } = form;
    const title = isNew ? 'Создание товара' : `Редактирование товара #${id}`;

    return (
      <Card title={title}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Title">
            {getFieldDecorator('title', {
              initialValue: (!isNew && data) ? data.title : '',
              normalize: value => value.trim(),
              rules: [
                { required: true, message: 'Please input good title!' },
                { max: 10, message: 'Max length!' }
              ],
            })(
              <Input/>,
            )}
          </Form.Item>
          <Form.Item label="Address">
            {getFieldDecorator('address', {
              initialValue: (!isNew && data) ? data.description : '',
              rules: [{ required: true, message: 'Please input good description!' }],
            })(
              <Input/>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
};

const WrappedGoodEditForm = Form.create<IProps>({ name: 'good_edit' })(GoodEditForm);

export default WrappedGoodEditForm;


