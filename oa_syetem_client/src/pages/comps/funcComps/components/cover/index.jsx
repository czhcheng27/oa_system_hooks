import React, {
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, DatePicker, message } from "antd";
import moment from "moment";
import { dataHasBeenUpdated, updateOutlineAllData } from "@/redux/actions";
import { RevisionContext } from "../..";
import css from "./index.module.less";

const { Item } = Form;

// eslint-disable-next-line react/display-name
const Cover = forwardRef(({ coverData }, ref) => {
  const [coverForm] = Form.useForm();

  const dispatch = useDispatch();

  const { preData } = useContext(RevisionContext);
  const outlineAllData = useSelector((s) => s.rdcTestOutlineAllData);

  const handleChange = () => {
    dispatch(dataHasBeenUpdated(true));
  };

  useImperativeHandle(ref, () => ({
    getCoverData: () => {
      return coverForm
        .validateFields()
        .then(() => {
          const data = coverForm.getFieldsValue();
          const subData = {
            ...data,
            publishDate: data.publishDate
              ? data.publishDate.format("YYYY-MM-DD")
              : "",
            implementDate: data.implementDate
              ? data.implementDate.format("YYYY-MM-DD")
              : "",
          };
          return subData;
        })
        .catch((e) => {
          message.error("仍有选项未填完，请补充完整");
          throw new Error("仍有选项未填完，请补充完整");
        });
    },
  }));

  useEffect(() => {
    // coverData &&
    coverForm.setFieldsValue({
      ...(preData?.infoData ?? coverData),
      publishDate: coverData.publishDate ? moment(coverData.publishDate) : "",
      implementDate: coverData.implementDate
        ? moment(coverData.implementDate)
        : "",
    });
  }, [coverData, preData]);

  const valueChange = (cur, all) => {
    const subData = {
      ...all,
      publishDate: all.publishDate ? all.publishDate.format("YYYY-MM-DD") : "",
      implementDate: all.implementDate
        ? all.implementDate.format("YYYY-MM-DD")
        : "",
    };
    outlineAllData[0].data = subData;
    dispatch(updateOutlineAllData(outlineAllData));
  };

  return (
    <div className={css.cover_wrapper}>
      <Form
        form={coverForm}
        autoComplete="off"
        labelCol={{ flex: "120px" }}
        onValuesChange={valueChange}
        // disabled
      >
        <Item
          label="Standard Name"
          name="standardName"
          rules={[{ required: true, message: "Please Input Standard Name" }]}
        >
          <Input
            disabled={true}
            placeholder="Please Input Standard Name"
            onChange={handleChange}
          />
        </Item>
        <Item
          label="Standard No"
          name="standardNo"
          rules={[{ required: true, message: "Please Input Standard No" }]}
        >
          <Input
            // disabled={!!coverForm.getFieldValue("standardNo")}
            placeholder="Please Input Standard No"
            onChange={handleChange}
          />
        </Item>
        {/* <Item label="发布日期" name="publishDate">
          <DatePicker
            disabled={true}
            onChange={handleChange}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          />
        </Item>
        <Item label="实施日期" name="implementDate">
          <DatePicker
            disabled={true}
            onChange={handleChange}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          />
        </Item> */}
      </Form>
    </div>
  );
});

export default Cover;
