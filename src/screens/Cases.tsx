import { useState } from 'react';
import { ArrowLeft, Plus, Camera, MapPin, Loader2, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { motion } from 'motion/react';

interface CasesProps {
  onBack: () => void;
}

type CaseStatus = 'pending' | 'in_progress' | 'resolved';

interface CaseComment {
  id: number;
  author: string;
  role: 'admin' | 'user';
  text: string;
  date: string;
}

interface Case {
  id: number;
  title: string;
  description: string;
  status: CaseStatus;
  date: string;
  address: string;
  photo?: string;
  comments?: CaseComment[];
  statusHistory?: { status: CaseStatus; date: string; comment?: string }[];
}

const mockCases: Case[] = [
  {
    id: 1,
    title: 'Яма на дороге',
    description: 'Большая яма на проезжей части, требует срочного ремонта',
    status: 'in_progress',
    date: '10 ноя 2025',
    address: 'ул. Амира Темура, 15',
    comments: [
      {
        id: 1,
        author: 'Оператор Юнусабадского района',
        role: 'admin',
        text: 'Заявка принята в работу. Бригада выедет на место в течение 2 рабочих дней.',
        date: '10 ноя 2025, 15:30',
      },
      {
        id: 2,
        author: 'Вы',
        role: 'user',
        text: 'Спасибо, буду ждать',
        date: '10 ноя 2025, 16:00',
      },
    ],
    statusHistory: [
      { status: 'pending', date: '10 ноя 2025, 14:20', comment: 'Заявка создана' },
      { status: 'in_progress', date: '10 ноя 2025, 15:30', comment: 'Заявка принята в работу' },
    ],
  },
  {
    id: 2,
    title: 'Неработающий фонарь',
    description: 'Уличный фонарь не работает уже 3 дня',
    status: 'resolved',
    date: '8 ноя 2025',
    address: 'пр. Бунёдкор, 32',
    comments: [
      {
        id: 1,
        author: 'Оператор Яккасарайского района',
        role: 'admin',
        text: 'Заявка принята. Направлена в службу освещения.',
        date: '8 ноя 2025, 10:15',
      },
      {
        id: 2,
        author: 'Служба освещения',
        role: 'admin',
        text: 'Фонарь отремонтирован. Просим проверить.',
        date: '9 ноя 2025, 18:30',
      },
    ],
    statusHistory: [
      { status: 'pending', date: '8 ноя 2025, 09:40', comment: 'Заявка создана' },
      { status: 'in_progress', date: '8 ноя 2025, 10:15', comment: 'В работе' },
      { status: 'resolved', date: '9 ноя 2025, 18:30', comment: 'Выполнено' },
    ],
  },
];

export function Cases({ onBack }: CasesProps) {
  const [view, setView] = useState<'list' | 'create' | 'details'>('list');
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [newCase, setNewCase] = useState({
    title: '',
    description: '',
    address: '',
  });
  const [newComment, setNewComment] = useState('');

  const selectedCase = cases.find(c => c.id === selectedCaseId);

  const handleCreateCase = () => {
    if (newCase.title && newCase.description) {
      const createdCase: Case = {
        id: cases.length + 1,
        ...newCase,
        status: 'pending',
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }),
        comments: [],
        statusHistory: [
          {
            status: 'pending',
            date: new Date().toLocaleString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            comment: 'Заявка создана',
          },
        ],
      };
      setCases([createdCase, ...cases]);
      setNewCase({ title: '', description: '', address: '' });
      setView('list');
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && selectedCase) {
      const updatedCases = cases.map(c => {
        if (c.id === selectedCase.id) {
          return {
            ...c,
            comments: [
              ...(c.comments || []),
              {
                id: (c.comments?.length || 0) + 1,
                author: 'Вы',
                role: 'user' as const,
                text: newComment,
                date: new Date().toLocaleString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
              },
            ],
          };
        }
        return c;
      });
      setCases(updatedCases);
      setNewComment('');
    }
  };

  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'resolved':
        return 'bg-emerald-100 text-emerald-700';
    }
  };

  const getStatusIcon = (status: CaseStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in_progress':
        return <Loader2 className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: CaseStatus) => {
    switch (status) {
      case 'pending':
        return 'Ожидает';
      case 'in_progress':
        return 'В работе';
      case 'resolved':
        return 'Решено';
    }
  };

  if (view === 'details' && selectedCase) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-4 py-12">
          <button onClick={() => setView('list')} className="mb-4">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </button>
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-slate-900 flex-1">{selectedCase.title}</h1>
            <span className={`px-3 py-1 rounded-lg text-xs flex items-center gap-1 ${getStatusColor(selectedCase.status)}`}>
              {getStatusIcon(selectedCase.status)}
              {getStatusLabel(selectedCase.status)}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Case Details */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-slate-900 mb-3">Детали заявки</h3>
            <div className="space-y-3">
              <div>
                <p className="text-slate-600 text-sm mb-1">Описание</p>
                <p className="text-slate-900">{selectedCase.description}</p>
              </div>
              <div className="flex items-start gap-1 text-sm">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-600">Адрес</p>
                  <p className="text-slate-900">{selectedCase.address}</p>
                </div>
              </div>
              <div>
                <p className="text-slate-600 text-sm">Создана</p>
                <p className="text-slate-900">{selectedCase.date}</p>
              </div>
            </div>
          </div>

          {/* Status History */}
          {selectedCase.statusHistory && selectedCase.statusHistory.length > 0 && (
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-slate-900 mb-4">История статусов</h3>
              <div className="space-y-4">
                {selectedCase.statusHistory.map((history, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full ${getStatusColor(history.status).replace('text-', 'bg-').replace('100', '500')} flex items-center justify-center`}>
                        {getStatusIcon(history.status)}
                      </div>
                      {index < selectedCase.statusHistory!.length - 1 && (
                        <div className="w-0.5 h-8 bg-slate-200 my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-slate-900">{history.comment || getStatusLabel(history.status)}</p>
                      <p className="text-slate-500 text-sm">{history.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-slate-900 mb-4">Комментарии</h3>
            
            {selectedCase.comments && selectedCase.comments.length > 0 ? (
              <div className="space-y-4 mb-4">
                {selectedCase.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-4 rounded-2xl ${
                      comment.role === 'admin'
                        ? 'bg-blue-50 border border-blue-100'
                        : 'bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className={`${comment.role === 'admin' ? 'text-blue-900' : 'text-slate-900'}`}>
                        {comment.author}
                      </p>
                      {comment.role === 'admin' && (
                        <span className="px-2 py-0.5 rounded bg-blue-200 text-blue-800 text-xs">
                          Оператор
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mb-2 ${comment.role === 'admin' ? 'text-blue-800' : 'text-slate-700'}`}>
                      {comment.text}
                    </p>
                    <p className={`text-xs ${comment.role === 'admin' ? 'text-blue-600' : 'text-slate-500'}`}>
                      {comment.date}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm mb-4">Пока нет комментариев</p>
            )}

            {/* Add Comment */}
            {selectedCase.status !== 'resolved' && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <Textarea
                  placeholder="Написать комментарий..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-20 rounded-2xl bg-slate-50 border-0 focus:outline-none focus:ring-2 focus:ring-[#3BB273] resize-none"
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="w-full h-12 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl disabled:opacity-50"
                >
                  Отправить комментарий
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'create') {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-4 py-12">
          <button onClick={() => setView('list')} className="mb-4">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="text-slate-900">Создать заявку</h1>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-slate-900 mb-2">Тема обращения</label>
                <input
                  type="text"
                  placeholder="Например: Яма на дороге"
                  value={newCase.title}
                  onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                  className="w-full h-12 px-4 rounded-2xl bg-slate-50 border-0 focus:outline-none focus:ring-2 focus:ring-[#3BB273] text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-900 mb-2">Описание</label>
                <Textarea
                  placeholder="Опишите проблему подробно..."
                  value={newCase.description}
                  onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                  className="min-h-32 rounded-2xl bg-slate-50 border-0 focus:outline-none focus:ring-2 focus:ring-[#3BB273] resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-900 mb-2">Адрес</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Укажите адрес или выберите на карте"
                    value={newCase.address}
                    onChange={(e) => setNewCase({ ...newCase, address: e.target.value })}
                    className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border-0 focus:outline-none focus:ring-2 focus:ring-[#3BB273] text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-900 mb-2">Фото или видео</label>
                <button className="w-full h-32 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 hover:border-[#3BB273] flex flex-col items-center justify-center gap-2 transition-colors">
                  <Camera className="w-8 h-8 text-slate-400" />
                  <span className="text-slate-600">Добавить файлы</span>
                </button>
              </div>
            </div>
          </div>

          <Button
            onClick={handleCreateCase}
            disabled={!newCase.title || !newCase.description}
            className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl disabled:opacity-50"
          >
            Отправить заявку
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-4 py-12">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </button>
        <h1 className="text-slate-900 mb-1">Мои заявки</h1>
        <p className="text-slate-600">{cases.length} обращений</p>
      </div>

      <div className="p-4 space-y-3">
        {cases.map((caseItem) => (
          <motion.div
            key={caseItem.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedCaseId(caseItem.id);
              setView('details');
            }}
            className="bg-white rounded-3xl p-5 shadow-sm cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">{caseItem.title}</h3>
                <p className="text-slate-600 text-sm line-clamp-2">{caseItem.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs flex items-center gap-1 ${getStatusColor(caseItem.status)}`}>
                {getStatusIcon(caseItem.status)}
                {getStatusLabel(caseItem.status)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-sm">
              <span className="text-slate-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {caseItem.address}
              </span>
              <span className="text-slate-500">{caseItem.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => setView('create')}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-2xl bg-[#3BB273] hover:bg-[#2ea563] shadow-lg flex items-center justify-center transition-colors"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}