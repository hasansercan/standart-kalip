import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, message, Modal, Popconfirm, Space, Statistic, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { buildApiUrl } from "../../../config/apiConfig";

const JobPage = () => {
    const [jobs, setJobs] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await fetch(buildApiUrl("/jobs/admin"));
            if (response.ok) {
                const data = await response.json();
                setJobs(data);
            } else {
                message.error("İş ilanları yüklenemedi");
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
            message.error("İş ilanları yüklenirken hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch(buildApiUrl("/jobs/stats/dashboard"));
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    useEffect(() => {
        fetchJobs();
        fetchStats();
    }, []);

    const deleteJob = async (id) => {
        try {
            const response = await fetch(buildApiUrl(`/jobs/${id}`), {
                method: "DELETE",
            });

            if (response.ok) {
                message.success("İş ilanı başarıyla silindi");
                fetchJobs();
                fetchStats();
            } else {
                message.error("İş ilanı silinemedi");
            }
        } catch (error) {
            console.error("Error deleting job:", error);
            message.error("İş ilanı silinirken hata oluştu");
        }
    };

    const toggleJobStatus = async (id) => {
        try {
            const response = await fetch(buildApiUrl(`/jobs/${id}/toggle`), {
                method: "PATCH",
            });

            if (response.ok) {
                message.success("İş ilanı durumu güncellendi");
                fetchJobs();
                fetchStats();
            } else {
                message.error("İş ilanı durumu güncellenemedi");
            }
        } catch (error) {
            console.error("Error toggling job status:", error);
            message.error("İş ilanı durumu güncellenirken hata oluştu");
        }
    };

    const showJobDetails = (job) => {
        setSelectedJob(job);
        setModalVisible(true);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('tr-TR');
    };

    const getJobTypeText = (type) => {
        const types = {
            "full-time": "Tam Zamanlı",
            "part-time": "Yarı Zamanlı",
            "contract": "Sözleşmeli",
            "internship": "Staj"
        };
        return types[type] || type;
    };

    const columns = [
        {
            title: "İş İlanı",
            dataIndex: "title",
            key: "title",
            render: (text, record) => (
                <div>
                    <div style={{ fontWeight: "bold", color: "#1890ff" }}>{text}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                        {record.department} • {record.location}
                    </div>
                </div>
            ),
        },
        {
            title: "Tür",
            dataIndex: "type",
            key: "type",
            render: (type) => (
                <Tag color="blue">{getJobTypeText(type)}</Tag>
            ),
        },
        {
            title: "Deneyim",
            dataIndex: "experience",
            key: "experience",
        },
        {
            title: "Maaş",
            dataIndex: "salary",
            key: "salary",
            render: (salary) => salary || "Belirtilmemiş",
        },
        {
            title: "Durum",
            dataIndex: "isActive",
            key: "isActive",
            render: (isActive) => (
                <Tag color={isActive ? "green" : "red"}>
                    {isActive ? "Aktif" : "Pasif"}
                </Tag>
            ),
        },
        {
            title: "Son Başvuru",
            dataIndex: "applicationDeadline",
            key: "applicationDeadline",
            render: (date) => date ? formatDate(date) : "Belirtilmemiş",
        },
        {
            title: "Oluşturulma",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => formatDate(date),
        },
        {
            title: "İşlemler",
            key: "actions",
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="primary"
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => showJobDetails(record)}
                    >
                        Detay
                    </Button>
                    <Button
                        size="small"
                        icon={record.isActive ? <CloseCircleOutlined /> : <CheckCircleOutlined />}
                        onClick={() => toggleJobStatus(record._id)}
                    >
                        {record.isActive ? "Pasif" : "Aktif"}
                    </Button>
                    <Button
                        type="primary"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => window.location.href = `/admin/jobs/update/${record._id}`}
                    >
                        Düzenle
                    </Button>
                    <Popconfirm
                        title="Bu iş ilanını silmek istediğinizden emin misiniz?"
                        onConfirm={() => deleteJob(record._id)}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <Button type="primary" danger size="small" icon={<DeleteOutlined />}>
                            Sil
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
                <h2>İş İlanları Yönetimi</h2>

                {/* İstatistikler */}
                <div style={{ marginBottom: "20px" }}>
                    <div className="row">
                        <div className="col-md-4">
                            <Card>
                                <Statistic
                                    title="Toplam İş İlanı"
                                    value={stats.total || 0}
                                    valueStyle={{ color: '#1890ff' }}
                                />
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <Card>
                                <Statistic
                                    title="Aktif İlanlar"
                                    value={stats.active || 0}
                                    valueStyle={{ color: '#52c41a' }}
                                />
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <Card>
                                <Statistic
                                    title="Pasif İlanlar"
                                    value={stats.inactive || 0}
                                    valueStyle={{ color: '#f5222d' }}
                                />
                            </Card>
                        </div>
                    </div>
                </div>

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => window.location.href = "/admin/jobs/create"}
                    style={{ marginBottom: "16px" }}
                >
                    Yeni İş İlanı Ekle
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={jobs}
                rowKey="_id"
                loading={loading}
                pagination={{
                    total: jobs.length,
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                }}
            />

            {/* Job Details Modal */}
            <Modal
                title={selectedJob?.title}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={800}
            >
                {selectedJob && (
                    <div>
                        <div className="row" style={{ marginBottom: "20px" }}>
                            <div className="col-md-6">
                                <p><strong>Departman:</strong> {selectedJob.department}</p>
                                <p><strong>Konum:</strong> {selectedJob.location}</p>
                                <p><strong>Tür:</strong> {getJobTypeText(selectedJob.type)}</p>
                                <p><strong>Deneyim:</strong> {selectedJob.experience}</p>
                            </div>
                            <div className="col-md-6">
                                <p><strong>Maaş:</strong> {selectedJob.salary || "Belirtilmemiş"}</p>
                                <p><strong>Son Başvuru:</strong> {selectedJob.applicationDeadline ? formatDate(selectedJob.applicationDeadline) : "Belirtilmemiş"}</p>
                                <p><strong>Durum:</strong>
                                    <Tag color={selectedJob.isActive ? "green" : "red"} style={{ marginLeft: "8px" }}>
                                        {selectedJob.isActive ? "Aktif" : "Pasif"}
                                    </Tag>
                                </p>
                                <p><strong>İlan Veren:</strong> {selectedJob.postedBy}</p>
                            </div>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <h4>Açıklama</h4>
                            <p style={{ whiteSpace: "pre-wrap" }}>{selectedJob.description}</p>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <h4>Aranan Özellikler</h4>
                            <ul>
                                {selectedJob.requirements?.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <h4>Sorumluluklar</h4>
                            <ul>
                                {selectedJob.responsibilities?.map((resp, index) => (
                                    <li key={index}>{resp}</li>
                                ))}
                            </ul>
                        </div>

                        {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                            <div>
                                <h4>Yan Haklar</h4>
                                <ul>
                                    {selectedJob.benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default JobPage;
