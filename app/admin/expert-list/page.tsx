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
import { Expert } from "@/lib/types";
import { Save, Upload, Plus, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { getImageUrl } from "@/lib/image-url";

export default function ExpertListAdminPage() {
  const router = useRouter();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [initialExperts, setInitialExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null);

  useEffect(() => {
    fetchExperts();
  }, []);

  // 检测是否有未保存的修改
  const hasUnsavedChanges = () => {
    return JSON.stringify(experts) !== JSON.stringify(initialExperts);
  };

  // 监听页面关闭
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const hasChanges = JSON.stringify(experts) !== JSON.stringify(initialExperts);
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
  }, [experts, initialExperts]);

  const fetchExperts = async () => {
    try {
      // 使用相对路径，通过 Next.js API 路由代理到后端
      const apiUrl = '/api';
      
      // 添加超时控制
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3秒超时
      
      try {
        const response = await fetch(`${apiUrl}/experts`, {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          const expertsData = data.length > 0 ? data : getDefaultExperts();
          setExperts(expertsData);
          setInitialExperts(JSON.parse(JSON.stringify(expertsData))); // 深拷贝保存初始数据
        } else {
          const defaultData = getDefaultExperts();
          setExperts(defaultData);
          setInitialExperts(JSON.parse(JSON.stringify(defaultData)));
        }
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          console.warn('API请求超时，使用默认数据');
        } else {
          console.warn('无法连接到后端服务，使用默认数据');
        }
        const defaultData = getDefaultExperts();
        setExperts(defaultData);
        setInitialExperts(JSON.parse(JSON.stringify(defaultData)));
      }
    } catch (error) {
      console.warn('获取专家数据失败，使用默认数据:', error);
      const defaultData = getDefaultExperts();
      setExperts(defaultData);
      setInitialExperts(JSON.parse(JSON.stringify(defaultData)));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (): Promise<boolean> => {
    setSaving(true);
    try {
      // 使用相对路径，通过 Next.js API 路由代理到后端
      const apiUrl = '/api';
      const response = await fetch(`${apiUrl}/experts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experts),
      });

      if (response.ok) {
        toast.success('专家信息保存成功！');
        // 保存成功后更新初始数据
        setInitialExperts(JSON.parse(JSON.stringify(experts)));
        return true;
      } else {
        toast.error('保存失败，请检查后端服务');
        return false;
      }
    } catch (error) {
      console.error('Failed to save experts:', error);
      toast.error('保存失败，请检查网络连接');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (expertId: string, file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('expertId', expertId);

    try {
      // 使用相对路径，通过 Next.js API 路由代理到后端
      const apiUrl = '/api';
      const response = await fetch(`${apiUrl}/experts/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const updatedExperts = experts.map(expert => 
          expert.id === expertId 
            ? { ...expert, image: data.imageUrl }
            : expert
        );
        setExperts(updatedExperts);
        toast.success('图片上传成功！');
      } else {
        toast.error('图片上传失败');
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      toast.error('图片上传失败，请检查网络连接');
    }
  };

  const handleAddExpert = () => {
    const newExpert: Expert = {
      id: Date.now().toString(),
      name: '',
      role: '',
      roleTitle: '',
      education: '',
      achievements: '',
      image: ''
    };
    setExperts([...experts, newExpert]);
  };

  const handleDeleteExpert = (id: string) => {
    if (experts.length <= 1) {
      toast.error('至少需要保留一位专家');
      return;
    }
    setExperts(experts.filter(expert => expert.id !== id));
  };

  const updateExpert = (id: string, field: keyof Expert, value: string) => {
    setExperts(experts.map(expert =>
      expert.id === id ? { ...expert, [field]: value } : expert
    ));
  };

  // 处理返回按钮点击
  const handleBackClick = () => {
    if (hasUnsavedChanges()) {
      setPendingNavigation(() => () => router.push('/admin'));
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
                专家列表管理
              </h1>
              <div className="flex gap-4">
                <Button onClick={handleAddExpert} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  添加专家
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? '保存中...' : '保存'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experts.map((expert, index) => (
                <Card key={expert.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-foreground">专家 {index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteExpert(expert.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* 照片上传 */}
                    <div>
                      <Label>照片</Label>
                      <div className="mt-2 flex items-center gap-4">
                        {expert.image && (
                          <img
                            src={getImageUrl(expert.image)}
                            alt={expert.name || 'Expert'}
                            className="w-24 h-24 rounded-lg object-cover border-2 border-primary/20"
                          />
                        )}
                        <div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(expert.id, file);
                              }
                            }}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 姓名 */}
                    <div>
                      <Label htmlFor={`name-${expert.id}`}>姓名</Label>
                      <Input
                        id={`name-${expert.id}`}
                        value={expert.name}
                        onChange={(e) => updateExpert(expert.id, 'name', e.target.value)}
                        placeholder="请输入姓名"
                      />
                    </div>

                    {/* 角色标题 */}
                    <div>
                      <Label htmlFor={`roleTitle-${expert.id}`}>角色标题（顶部显示）</Label>
                      <Input
                        id={`roleTitle-${expert.id}`}
                        value={expert.roleTitle}
                        onChange={(e) => updateExpert(expert.id, 'roleTitle', e.target.value)}
                        placeholder="例如：定子设计 工程师"
                      />
                    </div>

                    {/* 角色描述 */}
                    <div>
                      <Label htmlFor={`role-${expert.id}`}>角色描述</Label>
                      <Input
                        id={`role-${expert.id}`}
                        value={expert.role}
                        onChange={(e) => updateExpert(expert.id, 'role', e.target.value)}
                        placeholder="例如：定子设计、生产制造工程师"
                      />
                    </div>

                    {/* 教育背景 */}
                    <div>
                      <Label htmlFor={`education-${expert.id}`}>教育背景</Label>
                      <Input
                        id={`education-${expert.id}`}
                        value={expert.education}
                        onChange={(e) => updateExpert(expert.id, 'education', e.target.value)}
                        placeholder="例如：桂林电子科技大学 硕士"
                      />
                    </div>

                    {/* 主要成就 */}
                    <div>
                      <Label htmlFor={`achievements-${expert.id}`}>主要成就</Label>
                      <Textarea
                        id={`achievements-${expert.id}`}
                        value={expert.achievements}
                        onChange={(e) => updateExpert(expert.id, 'achievements', e.target.value)}
                        placeholder="例如：发表专利4篇,其中发明专利3篇,实用新型专利1篇"
                        rows={3}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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

function getDefaultExperts(): Expert[] {
  return [
    {
      id: '1',
      name: '回思樾',
      role: '定子设计、生产制造工程师',
      roleTitle: '定子设计 工程师',
      education: '桂林电子科技大学 硕士',
      achievements: '发表专利4篇,其中发明专利3篇,实用新型专利1篇',
      image: ''
    },
    {
      id: '2',
      name: '颜嘉豪',
      role: '仿真工程师、生产制造工程师',
      roleTitle: '热仿真 工程师',
      education: '陕西科技大学 硕士',
      achievements: '发表论文1篇,专利1篇',
      image: ''
    },
    {
      id: '3',
      name: '段李权',
      role: 'NPI主管,负责难度板跟进及交付',
      roleTitle: '制造 主管',
      education: '电子科技大学 本科',
      achievements: '具有15年厚铜生产经验,发表专利10余篇',
      image: ''
    },
    {
      id: '4',
      name: '刘伟',
      role: '电机专家,电机电磁仿真,结构设计',
      roleTitle: '电磁仿真 技术专家',
      education: '长沙理工大学 本科',
      achievements: '13年电机研发经验,实用新型专利4篇',
      image: ''
    }
  ];
}

