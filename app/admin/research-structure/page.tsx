'use client'

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Save, Upload, Plus, Trash2, Building2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ResearchStructureData } from "@/components/ResearchStructure";
import { getImageUrl } from "@/lib/image-url";

// 合作单位Logo图片组件（带占位符）
function PartnerLogoImage({ logo, name }: { logo: string; name: string }) {
  const [imageError, setImageError] = useState(false);
  
  if (imageError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
        <Building2 className="w-8 h-8 text-primary/40" />
      </div>
    );
  }
  
  return (
    <img
      src={getImageUrl(logo)}
      alt={name}
      className="w-full h-full object-contain p-2"
      onError={() => setImageError(true)}
    />
  );
}

export default function ResearchStructureAdminPage() {
  const router = useRouter();
  const [data, setData] = useState<ResearchStructureData | null>(null);
  const [initialData, setInitialData] = useState<ResearchStructureData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    fetchData();
  }, []);

  // 检测是否有未保存的修改
  const hasUnsavedChanges = () => {
    if (!data || !initialData) return false;
    return JSON.stringify(data) !== JSON.stringify(initialData);
  };

  // 监听页面关闭
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const hasChanges = data && initialData && JSON.stringify(data) !== JSON.stringify(initialData);
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '您有未保存的修改，确定要离开吗？';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [data, initialData]);

  const fetchData = async () => {
    try {
      // 使用相对路径，通过 Next.js API 路由代理到后端
      const apiUrl = '/api';
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      try {
        const response = await fetch(`${apiUrl}/research-structure`, {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const fetchedData = await response.json();
          if (fetchedData && fetchedData.center) {
            setData(fetchedData);
            setInitialData(JSON.parse(JSON.stringify(fetchedData))); // 深拷贝保存初始数据
          } else {
            const defaultData = getDefaultData();
            setData(defaultData);
            setInitialData(JSON.parse(JSON.stringify(defaultData)));
          }
        } else {
          const defaultData = getDefaultData();
          setData(defaultData);
          setInitialData(JSON.parse(JSON.stringify(defaultData)));
        }
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          console.warn('API请求超时，使用默认数据');
        } else {
          console.warn('无法连接到后端服务，使用默认数据');
        }
        const defaultData = getDefaultData();
        setData(defaultData);
        setInitialData(JSON.parse(JSON.stringify(defaultData)));
      }
    } catch (error) {
      console.warn('获取组织架构数据失败，使用默认数据:', error);
      const defaultData = getDefaultData();
      setData(defaultData);
      setInitialData(JSON.parse(JSON.stringify(defaultData)));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (): Promise<boolean> => {
    if (!data) return false;
    
    setSaving(true);
    try {
      // 使用相对路径，通过 Next.js API 路由代理到后端
      const apiUrl = '/api';
      const response = await fetch(`${apiUrl}/research-structure`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('组织架构数据保存成功！');
        // 保存成功后更新初始数据
        setInitialData(JSON.parse(JSON.stringify(data)));
        return true;
      } else {
        toast.error('保存失败，请检查后端服务');
        return false;
      }
    } catch (error) {
      console.error('Failed to save data:', error);
      toast.error('保存失败，请检查网络连接');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (partnerId: string, file: File) => {
    if (!data) return;

    const formData = new FormData();
    formData.append('logo', file);
    formData.append('partnerId', partnerId);

    try {
      // 使用相对路径，通过 Next.js API 路由代理到后端
      const apiUrl = '/api';
      const response = await fetch(`${apiUrl}/research-structure/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setData({
          ...data,
          partners: data.partners.map(partner =>
            partner.id === partnerId
              ? { ...partner, logo: result.imageUrl }
              : partner
          )
        });
        toast.success('Logo上传成功！');
      } else {
        toast.error('Logo上传失败');
      }
    } catch (error) {
      console.error('Failed to upload logo:', error);
      toast.error('Logo上传失败，请检查网络连接');
    }
  };

  const handleAddPartner = () => {
    if (!data) return;
    const newPartner = {
      id: Date.now().toString(),
      name: '',
      logo: ''
    };
    setData({
      ...data,
      partners: [...data.partners, newPartner]
    });
  };

  const handleDeletePartner = (id: string) => {
    if (!data) return;
    if (data.partners.length <= 1) {
      toast.error('至少需要保留一个合作单位');
      return;
    }
    setData({
      ...data,
      partners: data.partners.filter(partner => partner.id !== id)
    });
  };

  const updateCenterTitle = (value: string) => {
    if (!data) return;
    setData({
      ...data,
      center: { ...data.center, title: value }
    });
  };

  const updateLeadership = (index: number, value: string) => {
    if (!data) return;
    const newLeadership = [...data.leadership];
    newLeadership[index] = { name: value };
    setData({
      ...data,
      leadership: newLeadership
    });
  };

  const updateDepartment = (deptId: string, field: 'name' | 'groups' | 'functions', value: any) => {
    if (!data) return;
    setData({
      ...data,
      departments: data.departments.map(dept =>
        dept.id === deptId
          ? { ...dept, [field]: value }
          : dept
      )
    });
  };

  const updatePartner = (partnerId: string, field: 'name', value: string) => {
    if (!data) return;
    setData({
      ...data,
      partners: data.partners.map(partner =>
        partner.id === partnerId
          ? { ...partner, [field]: value }
          : partner
      )
    });
  };

  // 处理返回按钮点击
  const handleBackClick = () => {
    if (hasUnsavedChanges()) {
      setShowConfirmDialog(true);
    } else {
      router.push('/admin');
    }
  };

  // 处理确认对话框的保存并返回
  const handleSaveAndBack = async () => {
    setShowConfirmDialog(false);
    const saved = await handleSave();
    if (saved) {
      router.push('/admin');
    } else {
      // 保存失败，重新打开对话框
      setShowConfirmDialog(true);
    }
  };

  // 处理确认对话框的不保存返回
  const handleDiscardAndBack = () => {
    setShowConfirmDialog(false);
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">加载中...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">数据加载失败</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-foreground"
                onClick={handleBackClick}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回管理后台
              </Button>
            </div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                研发架构管理
              </h1>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? '保存中...' : '保存'}
              </Button>
            </div>

            {/* 中心标题 */}
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">中心标题</h2>
              <div>
                <Label htmlFor="center-title">技术中心标题</Label>
                <Input
                  id="center-title"
                  value={data.center.title}
                  onChange={(e) => updateCenterTitle(e.target.value)}
                  placeholder="例如：技术中心 SGC Labs"
                  className="mt-2"
                />
              </div>
            </Card>

            {/* 领导层 */}
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">领导层</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.leadership.map((leader, index) => (
                  <div key={index}>
                    <Label htmlFor={`leadership-${index}`}>职位 {index + 1}</Label>
                    <Input
                      id={`leadership-${index}`}
                      value={leader.name}
                      onChange={(e) => updateLeadership(index, e.target.value)}
                      placeholder="例如：总工程师"
                      className="mt-2"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* 部门 */}
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">部门</h2>
              <div className="space-y-6">
                {data.departments.map((dept) => (
                  <Card key={dept.id} className="p-4 border-primary/20">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`dept-name-${dept.id}`}>部门名称</Label>
                        <Input
                          id={`dept-name-${dept.id}`}
                          value={dept.name}
                          onChange={(e) => updateDepartment(dept.id, 'name', e.target.value)}
                          placeholder="例如：技术研发部"
                          className="mt-2"
                        />
                      </div>
                      
                      {dept.groups && (
                        <div>
                          <Label>子组（每行一个）</Label>
                          <Textarea
                            value={dept.groups.join('\n')}
                            onChange={(e) => {
                              const groups = e.target.value.split('\n').filter(g => g.trim());
                              updateDepartment(dept.id, 'groups', groups);
                            }}
                            placeholder="材料研究小组&#10;基础技术小组&#10;仿真小组"
                            rows={4}
                            className="mt-2"
                          />
                        </div>
                      )}
                      
                      {dept.functions && (
                        <div>
                          <Label>功能（每行一个）</Label>
                          <Textarea
                            value={dept.functions.join('\n')}
                            onChange={(e) => {
                              const functions = e.target.value.split('\n').filter(f => f.trim());
                              updateDepartment(dept.id, 'functions', functions);
                            }}
                            placeholder="项目流程管理&#10;知识产权管理&#10;重大专项申报&#10;项目评审组织"
                            rows={4}
                            className="mt-2"
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* 产学研合作单位 */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-foreground">产学研合作单位</h2>
                <Button onClick={handleAddPartner} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  添加合作单位
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.partners.map((partner) => (
                  <Card key={partner.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-foreground">合作单位</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePartner(partner.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {/* Logo上传 */}
                      <div>
                        <Label>Logo</Label>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="w-24 h-24 rounded-lg border-2 border-primary/20 bg-background flex items-center justify-center overflow-hidden">
                            {partner.logo ? (
                              <PartnerLogoImage 
                                logo={partner.logo} 
                                name={partner.name || 'Partner'} 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                                <Building2 className="w-8 h-8 text-primary/40" />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <Input
                              ref={(el) => {
                                fileInputRefs.current[partner.id] = el;
                              }}
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleLogoUpload(partner.id, file);
                                }
                              }}
                              className="hidden"
                              id={`file-input-${partner.id}`}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                fileInputRefs.current[partner.id]?.click();
                              }}
                              className="cursor-pointer"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              选择图片
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* 单位名称 */}
                      <div>
                        <Label htmlFor={`partner-name-${partner.id}`}>单位名称</Label>
                        <Input
                          id={`partner-name-${partner.id}`}
                          value={partner.name}
                          onChange={(e) => updatePartner(partner.id, 'name', e.target.value)}
                          placeholder="例如：南方科技大学"
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* 未保存修改确认对话框 */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>有未保存的修改</AlertDialogTitle>
            <AlertDialogDescription>
              您有未保存的修改，确定要离开吗？如果离开，未保存的修改将会丢失。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmDialog(false)}>
              取消
            </AlertDialogCancel>
            <Button
              variant="outline"
              onClick={handleDiscardAndBack}
              className="text-destructive hover:text-destructive"
            >
              不保存返回
            </Button>
            <AlertDialogAction onClick={handleSaveAndBack}>
              保存并返回
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function getDefaultData(): ResearchStructureData {
  return {
    center: {
      title: "技术中心 SGC Labs"
    },
    leadership: [
      { name: "总工程师" },
      { name: "技术委员会" }
    ],
    departments: [
      {
        id: "rnd",
        name: "技术研发部",
        icon: "network",
        groups: [
          "材料研究小组",
          "基础技术小组",
          "仿真小组"
        ]
      },
      {
        id: "product",
        name: "产品研发部",
        icon: "gear",
        groups: [
          "高频高速组",
          "刚挠结合组",
          "光模块小组",
          "ATE小组"
        ]
      },
      {
        id: "project",
        name: "项目管理部",
        icon: "squares",
        functions: [
          "项目流程管理",
          "知识产权管理",
          "重大专项申报",
          "项目评审组织"
        ]
      },
      {
        id: "lab",
        name: "中央实验室",
        icon: "flask",
        functions: [
          "建立研发平台并开放资源",
          "进行研发质量控制",
          "电子产品的失效分析与可靠性研究",
          "半导体集成电路先进封装测试工艺研究实验室"
        ]
      }
    ],
    partners: [
      {
        id: "1",
        name: "南方科技大学",
        logo: ""
      },
      {
        id: "2",
        name: "中国科学院深圳先进技术研究院",
        logo: ""
      },
      {
        id: "3",
        name: "中原工学院",
        logo: ""
      },
      {
        id: "4",
        name: "桂林航天工業學院",
        logo: ""
      }
    ]
  };
}

