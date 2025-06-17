import { Button, Form, Input, Spin, Switch, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { TextArea } = Input;

const UpdateProgramPage = () => {
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [features, setFeatures] = useState([""]);
    const [systemRequirements, setSystemRequirements] = useState([""]);
    const navigate = useNavigate();
    const { programId } = useParams();
    const [form] = Form.useForm();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchProgram = useCallback(async () => {
        setDataLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/programs/${programId}`);

            if (response.ok) {
                const data = await response.json();

                // Form alanlarını doldur
                form.setFieldsValue({
                    name: data.name,
                    version: data.version,
                    description: data.description,
                    downloadLink: data.downloadLink,
                    fileSize: data.fileSize,
                    lastUpdate: data.lastUpdate,
                    isActive: data.isActive,
                });

                // Özellikler ve sistem gereksinimlerini ayarla
                setFeatures(data.features || [""]);
                setSystemRequirements(data.systemRequirements || [""]);
            } else {
                message.error("Program bilgileri alınamadı.");
            }
        } catch (error) {
            } finally {
            setDataLoading(false);
        }
    }, [apiUrl, programId, form]);

    const onFinish = async (values) => {
        const filteredFeatures = features.filter(feature => feature.trim() !== "");
        const filteredSystemRequirements = systemRequirements.filter(req => req.trim() !== "");

        if (filteredFeatures.length === 0) {
            message.error("En az bir özellik eklemelisiniz.");
            return;
        }

        if (filteredSystemRequirements.length === 0) {
            message.error("En az bir sistem gereksinimi eklemelisiniz.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/programs/${programId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    features: filteredFeatures,
                    systemRequirements: filteredSystemRequirements,
                }),
            });

            if (response.ok) {
                message.success("Program başarıyla güncellendi.");
                navigate("/admin/programs");
            } else {
                message.error("Program güncellenirken bir hata oluştu.");
            }
        } catch (error) {
            } finally {
            setLoading(false);
        }
    };

    const addFeature = () => {
        setFeatures([...features, ""]);
    };

    const removeFeature = (index) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures);
    };

    const updateFeature = (index, value) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    const addSystemRequirement = () => {
        setSystemRequirements([...systemRequirements, ""]);
    };

    const removeSystemRequirement = (index) => {
        const newSystemRequirements = systemRequirements.filter((_, i) => i !== index);
        setSystemRequirements(newSystemRequirements);
    };

    const updateSystemRequirement = (index, value) => {
        const newSystemRequirements = [...systemRequirements];
        newSystemRequirements[index] = value;
        setSystemRequirements(newSystemRequirements);
    };

    useEffect(() => {
        fetchProgram();
    }, [fetchProgram]);

    if (dataLoading) {
        return (
            <div style={{ textAlign: "center", padding: "50px" }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2>Program Güncelle</h2>
            <Form
                form={form}
                name="updateProgram"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Program Adı"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen program adını giriniz!",
                        },
                    ]}
                >
                    <Input placeholder="Örn: Standart Kalıp CAD Program" />
                </Form.Item>

                <Form.Item
                    label="Versiyon"
                    name="version"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen program versiyonunu giriniz!",
                        },
                    ]}
                >
                    <Input placeholder="Örn: v2.5.1" />
                </Form.Item>

                <Form.Item
                    label="Açıklama"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen program açıklamasını giriniz!",
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Program hakkında detaylı açıklama..."
                    />
                </Form.Item>

                <Form.Item label="Özellikler">
                    {features.map((feature, index) => (
                        <div key={index} style={{ display: "flex", marginBottom: 8 }}>
                            <Input
                                placeholder="Program özelliği..."
                                value={feature}
                                onChange={(e) => updateFeature(index, e.target.value)}
                                style={{ marginRight: 8 }}
                            />
                            <Button
                                type="danger"
                                onClick={() => removeFeature(index)}
                                disabled={features.length === 1}
                            >
                                Sil
                            </Button>
                        </div>
                    ))}
                    <Button type="dashed" onClick={addFeature} style={{ width: "100%" }}>
                        + Özellik Ekle
                    </Button>
                </Form.Item>

                <Form.Item label="Sistem Gereksinimleri">
                    {systemRequirements.map((req, index) => (
                        <div key={index} style={{ display: "flex", marginBottom: 8 }}>
                            <Input
                                placeholder="Sistem gereksinimi..."
                                value={req}
                                onChange={(e) => updateSystemRequirement(index, e.target.value)}
                                style={{ marginRight: 8 }}
                            />
                            <Button
                                type="danger"
                                onClick={() => removeSystemRequirement(index)}
                                disabled={systemRequirements.length === 1}
                            >
                                Sil
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="dashed"
                        onClick={addSystemRequirement}
                        style={{ width: "100%" }}
                    >
                        + Sistem Gereksinimi Ekle
                    </Button>
                </Form.Item>

                <Form.Item
                    label="İndirme Linki"
                    name="downloadLink"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen indirme linkini giriniz!",
                        },
                    ]}
                >
                    <Input placeholder="Program indirme linki..." />
                </Form.Item>

                <Form.Item
                    label="Dosya Boyutu"
                    name="fileSize"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen dosya boyutunu giriniz!",
                        },
                    ]}
                >
                    <Input placeholder="Örn: 2.8 GB" />
                </Form.Item>

                <Form.Item
                    label="Son Güncelleme Tarihi"
                    name="lastUpdate"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen son güncelleme tarihini giriniz!",
                        },
                    ]}
                >
                    <Input placeholder="Örn: 15 Ocak 2024" />
                </Form.Item>

                <Form.Item
                    label="Aktif Durumu"
                    name="isActive"
                    valuePropName="checked"
                >
                    <Switch checkedChildren="Aktif" unCheckedChildren="Pasif" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Program Güncelle
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateProgramPage;
