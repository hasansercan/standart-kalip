import { EnvironmentOutlined, EyeOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Input, message, Modal, Select, Space, Statistic, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { buildApiUrl } from "../../../config/apiConfig";

const { TextArea } = Input;
const { Option } = Select;

const JobApplicationPage = () => {
    const [applications, setApplications] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [statusLoading, setStatusLoading] = useState(false);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await fetch(buildApiUrl("/job-applications"));
            if (response.ok) {
                const data = await response.json();
                setApplications(data);
            } else {
                message.error("İş başvuruları yüklenemedi");
            }
        } catch (error) {
            console.error("Error fetching applications:", error);
            message.error("İş başvuruları yüklenirken hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch(buildApiUrl("/job-applications/stats/dashboard"));
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    useEffect(() => {
        fetchApplications();
        fetchStats();
    }, []);

    const updateApplicationStatus = async (id, status, notes = "", reviewedBy = "Admin") => {
        setStatusLoading(true);
        try {
            const response = await fetch(buildApiUrl(`/job-applications/${id}/status`), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status, notes, reviewedBy }),
            });

            if (response.ok) {
                message.success("Başvuru durumu güncellendi");
                fetchApplications();
                fetchStats();
                setModalVisible(false);
            } else {
                message.error("Başvuru durumu güncellenemedi");
            }
        } catch (error) {
            console.error("Error updating application status:", error);
            message.error("Başvuru durumu güncellenirken hata oluştu");
        } finally {
            setStatusLoading(false);
        }
    };

    const showApplicationDetails = (application) => {
        setSelectedApplication(application);
        setModalVisible(true);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('tr-TR');
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: "orange",
            reviewing: "blue",
            interview: "purple",
            accepted: "green",
            rejected: "red"
        };
        return colors[status] || "default";
    };

    const getStatusText = (status) => {
        const statusTexts = {
            pending: "Beklemede",
            reviewing: "İnceleniyor",
            interview: "Mülakat",
            accepted: "Kabul",
            rejected: "Red"
        };
        return statusTexts[status] || status;
    };

    const columns = [
        {
            title: "Başvuran",
            key: "applicant",
            render: (_, record) => (
                <div>
                    <div style={{ fontWeight: "bold", color: "#1890ff" }}>
                        {record.firstName} {record.lastName}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                        {record.email}
                    </div>
                </div>
            ),
        },
        {
            title: "Pozisyon",
            dataIndex: "jobTitle",
            key: "jobTitle",
            render: (text) => (
                <span style={{ fontWeight: "500" }}>{text}</span>
            ),
        },
        {
            title: "Telefon",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Deneyim",
            dataIndex: "experience",
            key: "experience",
            render: (text) => (
                <span style={{ fontSize: "12px" }}>{text.length > 30 ? `${text.substring(0, 30)}...` : text}</span>
            ),
        },
        {
            title: "Durum",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={getStatusColor(status)}>
                    {getStatusText(status)}
                </Tag>
            ),
        },
        {
            title: "Başvuru Tarihi",
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
                        onClick={() => showApplicationDetails(record)}
                    >
                        Detay
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
                <h2>İş Başvuruları Yönetimi</h2>

                {/* İstatistikler */}
                <div style={{ marginBottom: "20px" }}>
                    <div className="row">
                        <div className="col-md-2">
                            <Card>
                                <Statistic
                                    title="Toplam Başvuru"
                                    value={stats.total || 0}
                                    valueStyle={{ color: '#1890ff' }}
                                />
                            </Card>
                        </div>
                        <div className="col-md-2">
                            <Card>
                                <Statistic
                                    title="Beklemede"
                                    value={stats.pending || 0}
                                    valueStyle={{ color: '#fa8c16' }}
                                />
                            </Card>
                        </div>
                        <div className="col-md-2">
                            <Card>
                                <Statistic
                                    title="İnceleniyor"
                                    value={stats.reviewing || 0}
                                    valueStyle={{ color: '#1890ff' }}
                                />
                            </Card>
                        </div>
                        <div className="col-md-2">
                            <Card>
                                <Statistic
                                    title="Mülakat"
                                    value={stats.interview || 0}
                                    valueStyle={{ color: '#722ed1' }}
                                />
                            </Card>
                        </div>
                        <div className="col-md-2">
                            <Card>
                                <Statistic
                                    title="Kabul"
                                    value={stats.accepted || 0}
                                    valueStyle={{ color: '#52c41a' }}
                                />
                            </Card>
                        </div>
                        <div className="col-md-2">
                            <Card>
                                <Statistic
                                    title="Red"
                                    value={stats.rejected || 0}
                                    valueStyle={{ color: '#f5222d' }}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={applications}
                rowKey="_id"
                loading={loading}
                pagination={{
                    total: applications.length,
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                }}
            />

            {/* Application Details Modal */}
            <Modal
                title={`${selectedApplication?.firstName} ${selectedApplication?.lastName} - Başvuru Detayları`}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={900}
            >
                {selectedApplication && (
                    <div>
                        {/* Kişisel Bilgiler */}
                        <div style={{ marginBottom: "20px" }}>
                            <h4 style={{ borderBottom: "2px solid #1890ff", paddingBottom: "8px" }}>
                                <UserOutlined /> Kişisel Bilgiler
                            </h4>
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Ad Soyad:</strong> {selectedApplication.firstName} {selectedApplication.lastName}</p>
                                    <p><strong><MailOutlined /> E-posta:</strong>
                                        <a href={`mailto:${selectedApplication.email}`} style={{ marginLeft: "8px" }}>
                                            {selectedApplication.email}
                                        </a>
                                    </p>
                                    <p><strong><PhoneOutlined /> Telefon:</strong>
                                        <a href={`tel:${selectedApplication.phone}`} style={{ marginLeft: "8px" }}>
                                            {selectedApplication.phone}
                                        </a>
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong><EnvironmentOutlined /> Adres:</strong> {selectedApplication.address}</p>
                                    <p><strong>Başvuru Tarihi:</strong> {formatDate(selectedApplication.createdAt)}</p>
                                    <p><strong>Pozisyon:</strong> {selectedApplication.jobTitle}</p>
                                </div>
                            </div>
                        </div>

                        {/* Profesyonel Bilgiler */}
                        <div style={{ marginBottom: "20px" }}>
                            <h4 style={{ borderBottom: "2px solid #1890ff", paddingBottom: "8px" }}>
                                Profesyonel Bilgiler
                            </h4>
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Deneyim:</strong></p>
                                    <p style={{ padding: "8px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
                                        {selectedApplication.experience}
                                    </p>
                                    <p><strong>Eğitim:</strong></p>
                                    <p style={{ padding: "8px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
                                        {selectedApplication.education}
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    {selectedApplication.skills && selectedApplication.skills.length > 0 && (
                                        <div>
                                            <p><strong>Yetenekler:</strong></p>
                                            <div style={{ marginBottom: "15px" }}>
                                                {selectedApplication.skills.map((skill, index) => (
                                                    <Tag key={index} color="blue" style={{ marginBottom: "4px" }}>
                                                        {skill}
                                                    </Tag>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedApplication.expectedSalary && (
                                        <p><strong>Beklenen Maaş:</strong> {selectedApplication.expectedSalary}</p>
                                    )}

                                    {selectedApplication.availableStartDate && (
                                        <p><strong>Başlama Tarihi:</strong> {formatDate(selectedApplication.availableStartDate)}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Ön Yazı */}
                        <div style={{ marginBottom: "20px" }}>
                            <h4 style={{ borderBottom: "2px solid #1890ff", paddingBottom: "8px" }}>
                                Ön Yazı
                            </h4>
                            <div style={{
                                padding: "12px",
                                backgroundColor: "#f9f9f9",
                                borderRadius: "4px",
                                whiteSpace: "pre-wrap",
                                lineHeight: "1.6"
                            }}>
                                {selectedApplication.coverLetter}
                            </div>
                        </div>

                        {/* Ek Bilgiler */}
                        {(selectedApplication.resumeUrl || selectedApplication.portfolio || selectedApplication.linkedIn) && (
                            <div style={{ marginBottom: "20px" }}>
                                <h4 style={{ borderBottom: "2px solid #1890ff", paddingBottom: "8px" }}>
                                    Ek Bilgiler
                                </h4>
                                <div className="row">
                                    <div className="col-md-12">
                                        {selectedApplication.resumeUrl && (
                                            <p><strong>CV:</strong>
                                                <a href={selectedApplication.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "8px" }}>
                                                    CV'yi Görüntüle
                                                </a>
                                            </p>
                                        )}
                                        {selectedApplication.portfolio && (
                                            <p><strong>Portfolio:</strong>
                                                <a href={selectedApplication.portfolio} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "8px" }}>
                                                    Portfolio'yu Görüntüle
                                                </a>
                                            </p>
                                        )}
                                        {selectedApplication.linkedIn && (
                                            <p><strong>LinkedIn:</strong>
                                                <a href={selectedApplication.linkedIn} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "8px" }}>
                                                    LinkedIn Profilini Görüntüle
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Başvuru Durumu */}
                        <div style={{ marginBottom: "20px" }}>
                            <h4 style={{ borderBottom: "2px solid #1890ff", paddingBottom: "8px" }}>
                                Başvuru Durumu
                            </h4>
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Mevcut Durum:</strong>
                                        <Tag color={getStatusColor(selectedApplication.status)} style={{ marginLeft: "8px" }}>
                                            {getStatusText(selectedApplication.status)}
                                        </Tag>
                                    </p>
                                    {selectedApplication.reviewedBy && (
                                        <p><strong>İnceleyen:</strong> {selectedApplication.reviewedBy}</p>
                                    )}
                                    {selectedApplication.reviewedAt && (
                                        <p><strong>İnceleme Tarihi:</strong> {formatDate(selectedApplication.reviewedAt)}</p>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <div>
                                        <p><strong>Durumu Güncelle:</strong></p>
                                        <Space direction="vertical" style={{ width: "100%" }}>
                                            <Select
                                                value={selectedApplication.status}
                                                style={{ width: "100%" }}
                                                onChange={(value) => {
                                                    Modal.confirm({
                                                        title: 'Başvuru durumunu güncellemek istediğinizden emin misiniz?',
                                                        content: (
                                                            <div>
                                                                <p>Yeni durum: <Tag color={getStatusColor(value)}>{getStatusText(value)}</Tag></p>
                                                                <TextArea
                                                                    placeholder="Not ekleyin (opsiyonel)"
                                                                    rows={3}
                                                                    id="statusNotes"
                                                                />
                                                            </div>
                                                        ),
                                                        onOk() {
                                                            const notes = document.getElementById('statusNotes')?.value || '';
                                                            updateApplicationStatus(selectedApplication._id, value, notes);
                                                        },
                                                    });
                                                }}
                                            >
                                                <Option value="pending">Beklemede</Option>
                                                <Option value="reviewing">İnceleniyor</Option>
                                                <Option value="interview">Mülakat</Option>
                                                <Option value="accepted">Kabul</Option>
                                                <Option value="rejected">Red</Option>
                                            </Select>
                                        </Space>
                                    </div>
                                </div>
                            </div>

                            {selectedApplication.notes && (
                                <div style={{ marginTop: "15px" }}>
                                    <p><strong>Notlar:</strong></p>
                                    <div style={{
                                        padding: "8px",
                                        backgroundColor: "#fff7e6",
                                        border: "1px solid #ffd591",
                                        borderRadius: "4px"
                                    }}>
                                        {selectedApplication.notes}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default JobApplicationPage;
