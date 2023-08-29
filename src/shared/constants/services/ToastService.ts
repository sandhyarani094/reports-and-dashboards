export const showToaster = (
    toastRef: any,
    severity: "success" | "info" | "warn" | "error",
    header: string,
    content: string
) => {
    toastRef.current?.show({
        severity: severity,
        summary: header,
        detail: content,
        life: 3000,
    });
};