import type { ComponentType } from "react";

import { withDemoUsage } from "./doc-demo-usage";

const demoModules = import.meta.glob("./demos/*-demo.tsx", {
  eager: true,
}) as Record<string, Record<string, unknown>>;

const demoSources = import.meta.glob("./demos/*-demo.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const wrapped = Object.fromEntries(
  Object.entries(demoModules).flatMap(([path, mod]) => {
    const filename = path.replace("./demos/", "");
    const source = demoSources[path] ?? "";
    return Object.entries(mod)
      .filter(
        (entry): entry is [string, ComponentType] =>
          typeof entry[1] === "function" && /Demo$/.test(entry[0]),
      )
      .map(([name, Demo]) => [
        name,
        withDemoUsage(Demo, source, filename),
      ]);
  }),
) as Record<string, ComponentType>;

export const AccordionDemo = wrapped.AccordionDemo;
export const AppLayoutDemo = wrapped.AppLayoutDemo;
export const AspectRatioDemo = wrapped.AspectRatioDemo;
export const AvatarDemo = wrapped.AvatarDemo;
export const BadgeDemo = wrapped.BadgeDemo;
export const BannerDemo = wrapped.BannerDemo;
export const ButtonDemo = wrapped.ButtonDemo;
export const ButtonGroupDemo = wrapped.ButtonGroupDemo;
export const ChartDemo = wrapped.ChartDemo;
export const CheckboxDemo = wrapped.CheckboxDemo;
export const ChoiceCardDemo = wrapped.ChoiceCardDemo;
export const CollapsibleDemo = wrapped.CollapsibleDemo;
export const SelectDemo = wrapped.SelectDemo;
export const CommandDemo = wrapped.CommandDemo;
export const ConfirmationModalDemo = wrapped.ConfirmationModalDemo;
export const CopyButtonDemo = wrapped.CopyButtonDemo;
export const CustomerCardDemo = wrapped.CustomerCardDemo;
export const DataListDemo = wrapped.DataListDemo;
export const DatePickerDemo = wrapped.DatePickerDemo;
export const DetailCardDemo = wrapped.DetailCardDemo;
export const DialogDemo = wrapped.DialogDemo;
export const DrawerDemo = wrapped.DrawerDemo;
export const DropdownMenuDemo = wrapped.DropdownMenuDemo;
export const EmptyDemo = wrapped.EmptyDemo;
export const FieldDemo = wrapped.FieldDemo;
export const FileUploadDemo = wrapped.FileUploadDemo;
export const FormLayoutDemo = wrapped.FormLayoutDemo;
export const FormLayoutModalDemo = wrapped.FormLayoutModalDemo;
export const FormLayoutPageDemo = wrapped.FormLayoutPageDemo;
export const FormSectionDemo = wrapped.FormSectionDemo;
export const IndexDemo = wrapped.IndexDemo;
export const InputDemo = wrapped.InputDemo;
export const InputGroupDemo = wrapped.InputGroupDemo;
export const InstallationDemo = wrapped.InstallationDemo;
export const KbdDemo = wrapped.KbdDemo;
export const LabelDemo = wrapped.LabelDemo;
export const MetricCardDemo = wrapped.MetricCardDemo;
export const PageLayoutDemo = wrapped.PageLayoutDemo;
export const PaginationDemo = wrapped.PaginationDemo;
export const ProgressDemo = wrapped.ProgressDemo;
export const QuantityInputDemo = wrapped.QuantityInputDemo;
export const RadioGroupDemo = wrapped.RadioGroupDemo;
export const ResourcePickerDemo = wrapped.ResourcePickerDemo;
export const LocationSelectDemo = wrapped.LocationSelectDemo;
export const ProductCategorySelectDemo = wrapped.ProductCategorySelectDemo;
export const CouponSelectDemo = wrapped.CouponSelectDemo;
export const DiscountSelectDemo = wrapped.DiscountSelectDemo;
export const PickupSelectDemo = wrapped.PickupSelectDemo;
export const RoleSelectDemo = wrapped.RoleSelectDemo;
export const ShippingSelectDemo = wrapped.ShippingSelectDemo;
export const StaffSelectDemo = wrapped.StaffSelectDemo;
export const TaxSelectDemo = wrapped.TaxSelectDemo;
export const SchemaFormDemo = wrapped.SchemaFormDemo;
export const SchemaTableDemo = wrapped.SchemaTableDemo;
export const SkeletonDemo = wrapped.SkeletonDemo;
export const SliderDemo = wrapped.SliderDemo;
export const SpinnerDemo = wrapped.SpinnerDemo;
export const SwitchDemo = wrapped.SwitchDemo;
export const TextEditorDemo = wrapped.TextEditorDemo;
export const TabsDemo = wrapped.TabsDemo;
export const TextareaDemo = wrapped.TextareaDemo;
export const ToastDemo = wrapped.ToastDemo;
export const TooltipDemo = wrapped.TooltipDemo;
