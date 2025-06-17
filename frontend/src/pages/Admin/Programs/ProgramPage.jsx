import { Button, message, Popconfirm, Space, Switch, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProgramPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const columns = [
        {
            title: "Program Adı",
            dataIndex: "name",
            key: "name",
            render: (text) => <b>{text}</b>,
        },
        {
            title: "Versiyon",
            dataIndex: "version",
            key: "version",
            render: (text) => <span style={{ color: "#1890ff" }}>{text}</span>,
        },
        {
            title: "Dosya Boyutu",
            dataIndex: "fileSize",
            key: "fileSize",
        },
        {
            title: "Son Güncelleme",
            dataIndex: "lastUpdate",
            key: "lastUpdate",
        },
        {
            title: "Aktif",
            dataIndex: "isActive",
            key: "isActive",
            render: (isActive, record) => (
                <Switch
                    checked={isActive}
                    onChange={() => toggleProgramStatus(record._id)}
                    checkedChildren="Aktif"
                    unCheckedChildren="Pasif"
                />
            ),
        },
        {
            title: "İşlemler",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={() => navigate(`/admin/programs/update/${record._id}`)}
                    >
                        Güncelle
                    </Button>
                    <Popconfirm
                        title="Programı Sil"
                        description="Programı silmek istediğinizden emin misiniz?"
                        okText="Evet"
                        cancelText="Hayır"
                        onConfirm={() => deleteProgram(record._id)}
                    >
                        <Button type="primary" danger>
                            Sil
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const fetchPrograms = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/api/programs`);

            if (response.ok) {
                const data = await response.json();
                setDataSource(data);
            } else {
                message.error("Veri getirme başarısız.");
            }
        } catch (error) {
            } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    const deleteProgram = async (programId) => {
        try {
            const response = await fetch(`${apiUrl}/api/programs/${programId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                message.success("Program başarıyla silindi.");
                fetchPrograms();
            } else {
                message.error("Silme işlemi başarısız.");
            }
        } catch (error) {
            }
    };

    const toggleProgramStatus = async (programId) => {
        try {
            const response = await fetch(`${apiUrl}/api/programs/${programId}/toggle`, {
                method: "PUT",
            });

            if (response.ok) {
                message.success("Program durumu güncellendi.");
                fetchPrograms();
            } else {
                message.error("Durum güncelleme başarısız.");
            }
        } catch (error) {
            }
    };

    useEffect(() => {
        fetchPrograms();
    }, [fetchPrograms]);

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={(record) => record._id}
            loading={loading}
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`,
            }}
        />
    );
};

export default ProgramPage;
