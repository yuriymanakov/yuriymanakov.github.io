import React from 'react';

import {
  Form,
  Collapse,
  InputNumber,
  Button
} from 'antd';

import './styles.less';
import { WrappedFormUtils } from 'antd/es/form/Form';

interface IOwnProps {
  goods: IUnallocatedGood[];
  form: WrappedFormUtils;
}

const { Panel } = Collapse;
const ButtonGroup = Button.Group;

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

class UnallocatedGoods extends React.Component<IOwnProps> {
  constructor(props: IOwnProps) {
    super(props);
    this.setItemMax = this.setItemMax.bind(this);
  }

  checkValue = (rule: { min: number, max: number }, value: number, callback: (error?: string) => void) => {
    if(!isFinite(value)) {
      return 'Nechislo'!
    }

    if(value < rule.min) {
      return callback('Nifiga');
    }

    if(value > rule.max) {
      return callback('Dofiga');
    }

    if ((value ^ 0) !== value) {
      return callback('Neceloe');
    }

    return callback();
  };

  setItemMax(good: IUnallocatedGood) {
    this.props.form.setFieldsValue({
      [`unallocatedGoodsRequest[${good.id}]`]: good.number
    });
  }

  render () {
    const { goods, form } = this.props;
    const { getFieldDecorator } = form;
    const errors = form.getFieldError('unallocatedGoodsRequest');
    const hasError = errors && !!errors.find(item => !!item);
    const hasValues = !!goods.map(good => form.getFieldValue(`unallocatedGoodsRequest[${good.id}]`))
      .find(value => !!value);

    return (
      <Collapse>
        <Panel
          key="unallocatedGoods"
          header={"Получить нераспределенные товары"}
          className={hasError ? 'error-panel' : hasValues? 'filled-panel' : ''}>
          {
            goods.map(good =>
              <Form.Item key={good.id} label={`${good.title} (максимум: ${good.number} единиц)`} {...layout}>
                <ButtonGroup>
                  {getFieldDecorator(`unallocatedGoodsRequest[${good.id}]`, {
                    initialValue: 0,
                    rules: [
                      { validator: this.checkValue, min: 0, max: good.number}
                    ],
                  })(
                    <InputNumber min={0} />
                  )}
                  <Button type="primary" onClick={() => this.setItemMax(good)}>max</Button>
                </ButtonGroup>
              </Form.Item>
            )
          }
        </Panel>
      </Collapse>
    )
  }
}

export default UnallocatedGoods;



