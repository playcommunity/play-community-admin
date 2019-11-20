import {
  Button,
  Card,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  Radio,
  Upload,
  Select,
  Tooltip,
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import { BaseSetting } from './model';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface FormProps extends FormComponentProps {
  data: BaseSetting;
  submitting: boolean;
  dispatch: Dispatch<any>;
}

class BaseSettingForm extends Component<FormProps> {
  componentDidMount() {
    console.log('componentDidMount ...');
    const { data, dispatch } = this.props;
    console.dir({log: 'componentDidMount - data: ', ...data});
    console.dir({log: 'componentDidMount - this.props: ', ...this.props});
    dispatch({
      type: 'systemSetting/fetchBaseSetting',
    });
  };

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("dispatch .....");
        dispatch({
          type: 'systemSetting/saveBaseSetting',
          payload: values,
        });
      }
    });
  };

  render() {
    console.log("render ...");
    const { data, submitting } = this.props;
    console.dir({log: 'render - data: ', ...data});
    console.dir({log: 'render - this.props: ', ...this.props});
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <PageHeaderWrapper content={<FormattedMessage id="form-basic-form.basic.description" />}>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label='网站名称'>
              {getFieldDecorator('name', {
                initialValue: data.name,
                rules: [{required: true, message: '请输入网站名称'}]
              })(<Input placeholder='网站中文名称，例如：PlayScala社区' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='网站首页'>
              {getFieldDecorator('url', {
                initialValue: data.url,
                rules: [{required: true, message: '请输入网站首页地址'}]
              })(<Input placeholder='网站首页地址，例如：http://www.playscala.cn' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='首页标题'>
              {getFieldDecorator('title', {
                initialValue: data.title,
                rules: [{required: true, message: '请输入网站首页标题'}]
              })(<Input placeholder='网站首页标题，例如：欢迎来到PlayScala社区' />)}
            </FormItem>
            <Form.Item {...formItemLayout} label="网站LOGO" extra="请选择网站LOGO，分辨率为190*40">
              {getFieldDecorator('logo', {
                valuePropName: 'logo',
                getValueFromEvent: this.normFile,
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" /> 上传LOGO
                  </Button>
                </Upload>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="网站图标" extra="请选择网站图标，ICO格式，分辨率为32*32">
              {getFieldDecorator('favorite', {
                valuePropName: 'favorite',
                getValueFromEvent: this.normFile,
              })(
                <Upload name="favorite" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" /> 上传图标
                  </Button>
                </Upload>
              )}
            </Form.Item>
            <FormItem 
              {...formItemLayout}
              label={
                <span>
                  SEO描述
                  <em className={styles.optional}>
                   （选填）
                    <Tooltip title="用于SEO优化" >
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('seoDescription', {
                initialValue: data.seoDescription,
                rules: [{required: true, message: '请输入SEO描述'}],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder='请输入SEO描述，即网站简介，方便搜索引擎收录'
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label='SEO关键词'>
              {getFieldDecorator('seoKeyword', {
                initialValue: data.seoKeyword,
                rules: [{required: true, message: '请输入SEO关键词'}],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder='请输入SEO关键词'
                  rows={4}
                />
              )}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form-basic-form.form.submit" />
              </Button>
              <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="form-basic-form.form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<FormProps>()(
  connect(({ systemSetting, loading }: { systemSetting: {current: BaseSetting}, loading: { effects: { [key: string]: boolean } } }) => ({
    data: systemSetting.current,
    submitting: loading.effects['systemSetting/saveBaseSetting'],
  }))(BaseSettingForm),
);
