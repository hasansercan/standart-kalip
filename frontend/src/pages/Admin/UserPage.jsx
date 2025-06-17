import { Button, message, Popconfirm, Space, Switch, Table, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="Avatar"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.src = '/img/avatars/avatar1.jpg'; // Fallback image
          }}
        />
      ),
    },
    {
      title: "Kullanıcı Adı",
      dataIndex: "username",
      key: "username",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        let color = 'default';
        let text = role;

        switch (role) {
          case 'admin':
            color = 'red';
            text = 'Yönetici';
            break;
          case 'moderator':
            color = 'blue';
            text = 'Moderatör';
            break;
          case 'user':
            color = 'green';
            text = 'Kullanıcı';
            break;
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Durum",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={(checked) => toggleUserStatus(record._id, checked, record.role)}
          checkedChildren="Aktif"
          unCheckedChildren="Pasif"
          disabled={record.role === 'admin'} // Admin hesabı pasif edilemesin
        />
      ),
    },
    {
      title: "Kayıt Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString('tr-TR'),
    },
    {
      title: "İşlemler",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/users/update/${record._id}`)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Kullanıcıyı Sil"
            description={
              record.role === 'admin'
                ? "Admin hesabı silinemez!"
                : "Kullanıcıyı silmek istediğinizden emin misiniz?"
            }
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteUser(record._id)}
            disabled={record.role === 'admin'} // Admin hesabı silinemesin
          >
            <Button
              type="primary"
              danger
              disabled={record.role === 'admin'} // Admin hesabı silinemesin
            >
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/users`);

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

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/api/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Kullanıcı başarıyla silindi.");
        fetchUsers();
      } else {
        const errorData = await response.json();
        message.error(errorData.error || "Silme işlemi başarısız.");
      }
    } catch (error) {
      message.error("Silme işlemi başarısız.");
    }
  };

  const toggleUserStatus = async (userId, newStatus, userRole) => {
    if (userRole === 'admin' && !newStatus) {
      message.warning("Admin hesabı pasif edilemez.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/users/${userId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: newStatus }),
      });

      if (response.ok) {
        message.success("Kullanıcı durumu güncellendi.");
        fetchUsers();
      } else {
        const errorData = await response.json();
        message.error(errorData.error || "Durum güncelleme başarısız.");
      }
    } catch (error) {
      message.error("Durum güncelleme başarısız.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
      scroll={{ x: 800 }}
    />
  );
};

export default UserPage;
