type ToastContent = string | JSX.Element;

export const showToaster = (
    toastRef: any,
    severity: "success" | "info" | "warn" | "error",
    header: string,
    content: ToastContent
) => {
    toastRef.current?.show({
        severity: severity,
        summary: header,
        detail: content,
        life: 1000,
    });
};