import { useState } from "react";
import {
  CreditCard,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  ParkingSquare,
  Zap,
  DollarSign,
  TrendingUp,
  MoreHorizontal,
  Eye,
  EyeOff,
  Sparkles,
  X,
  Receipt,
  MapPin,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { motion, AnimatePresence } from "motion/react";

export function Wallet() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [showAddCard, setShowAddCard] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const transactions = [
    {
      id: 1,
      type: "expense",
      title: "Парковка Amir Temur",
      location: "ул. Амира Темура, 1",
      amount: -10000,
      date: "12 ноя, 14:32",
      icon: ParkingSquare,
      color: "bg-blue-500",
      details: {
        duration: "2 часа",
        rate: "5000 сум/час",
        transactionId: "TXN-2024-001234",
      },
    },
    {
      id: 2,
      type: "expense",
      title: "Зарядка EVpoint",
      location: "пр. Бунёдкор, 45",
      amount: -45000,
      date: "11 ноя, 09:15",
      icon: Zap,
      color: "bg-emerald-500",
      details: {
        duration: "30 минут",
        power: "50 кВт",
        transactionId: "TXN-2024-001233",
      },
    },
    {
      id: 3,
      type: "income",
      title: "Пополнение баланса",
      location: "Карта •••• 4321",
      amount: 200000,
      date: "10 ноя, 18:22",
      icon: DollarSign,
      color: "bg-[#3BB273]",
      details: {
        method: "Uzcard",
        transactionId: "TXN-2024-001232",
      },
    },
    {
      id: 4,
      type: "expense",
      title: "Парковка Magic City",
      location: "пр. Бунёдкор, 17",
      amount: -8000,
      date: "9 ноя, 12:45",
      icon: ParkingSquare,
      color: "bg-blue-500",
      details: {
        duration: "1 час 36 минут",
        rate: "5000 сум/час",
        transactionId: "TXN-2024-001231",
      },
    },
  ];

  const stats = [
    {
      label: "Расходы",
      value: "63 000",
      trend: "+12%",
      color: "text-red-600",
    },
    {
      label: "Кэшбэк",
      value: "3 150",
      trend: "+5%",
      color: "text-emerald-600",
    },
  ];

  const handleAddCard = () => {
    // Handle card addition logic
    setShowAddCard(false);
    setCardNumber("");
    setCardExpiry("");
    setCardCVV("");
  };

  const selectedTx = transactions.find(t => t.id === selectedTransaction);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modern Header with Balance Card */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-12 pb-32">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-slate-50">Кошелек</h1>
          <button className="w-10 h-10 rounded-xl bg-slate-50/10 hover:bg-slate-50/20 flex items-center justify-center transition-colors">
            <MoreHorizontal className="w-5 h-5 text-slate-50" />
          </button>
        </div>

        {/* Main Balance Card - floating effect */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-[#3BB273]/20 blur-3xl rounded-full" />

          <div className="relative bg-gradient-to-br from-[#3BB273] via-emerald-500 to-emerald-600 rounded-3xl p-6 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50/5 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/20 rounded-full blur-xl" />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-50/20 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-slate-50" />
                  </div>
                  <span className="text-emerald-100 text-sm">
                    Основной баланс
                  </span>
                </div>
                <button
                  onClick={() =>
                    setBalanceVisible(!balanceVisible)
                  }
                  className="w-9 h-9 rounded-lg bg-slate-50/10 hover:bg-slate-50/20 flex items-center justify-center transition-colors"
                >
                  {balanceVisible ? (
                    <Eye className="w-4 h-4 text-slate-50" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-slate-50" />
                  )}
                </button>
              </div>

              <div className="mb-8">
                {balanceVisible ? (
                  <h2 className="text-slate-50 mb-1">
                    157 000 сум
                  </h2>
                ) : (
                  <h2 className="text-slate-50 mb-1">
                    •••••• сум
                  </h2>
                )}
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-200" />
                  <span className="text-emerald-200 text-sm">
                    +15 000 за месяц
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button className="h-12 bg-slate-50 hover:bg-emerald-50 text-[#3BB273] rounded-2xl shadow-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Пополнить
                </Button>
                <Button className="h-12 bg-slate-50/10 hover:bg-slate-50/20 text-slate-50 rounded-2xl backdrop-blur-sm border border-slate-50/20">
                  <ArrowUpRight className="w-5 h-5 mr-2" />
                  Отправить
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Cards - overlapping design */}
      <div className="px-4 -mt-20 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-4 shadow-lg"
            >
              <p className="text-slate-600 text-sm mb-1">
                {stat.label}
              </p>
              <div className="flex items-end justify-between">
                <p className="text-slate-900">
                  {stat.value} сум
                </p>
                <span className={`text-xs ${stat.color}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-4 pb-6">
        {/* Payment Cards - Modern card design */}
        <div className="bg-slate-50 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900">Платежные карты</h3>
            <button className="text-[#3BB273] text-sm hover:text-[#2ea563]">
              Управление
            </button>
          </div>

          <div className="space-y-3">
            {/* Uzcard - realistic card design */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-6 shadow-xl cursor-pointer"
            >
              {/* Card shine effect */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50/10 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-8 rounded bg-amber-400" />
                    <div className="w-8 h-6 rounded bg-amber-300/50" />
                  </div>
                  <span className="text-slate-50/90 text-sm uppercase tracking-wider">
                    Uzcard
                  </span>
                </div>
                <p className="text-slate-50 text-xl tracking-[0.3em] mb-4">
                  •••• •••• •••• 4321
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-xs mb-1">
                      Владелец
                    </p>
                    <p className="text-slate-50 text-sm">
                      AZIZ SAIDOV
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-200 text-xs mb-1">
                      Истекает
                    </p>
                    <p className="text-slate-50 text-sm">12/27</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Humo card placeholder */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 p-6 shadow-xl cursor-pointer opacity-60"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50/10 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-8 rounded bg-yellow-400" />
                    <div className="w-8 h-6 rounded bg-yellow-300/50" />
                  </div>
                  <span className="text-slate-50/90 text-sm uppercase tracking-wider">
                    Humo
                  </span>
                </div>
                <p className="text-slate-50 text-xl tracking-[0.3em] mb-4">
                  •••• •••• •••• 8765
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-200 text-xs mb-1">
                      Владелец
                    </p>
                    <p className="text-slate-50 text-sm">
                      AZIZ SAIDOV
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-200 text-xs mb-1">
                      Истекает
                    </p>
                    <p className="text-slate-50 text-sm">08/26</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddCard(true)}
              className="w-full h-14 rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#3BB273] hover:bg-emerald-50/50 text-slate-600 hover:text-[#3BB273] flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-5 h-5" />
              Добавить карту
            </motion.button>
          </div>
        </div>

        {/* Transactions - Enhanced design */}
        <div className="bg-slate-50 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900">
              Последние операции
            </h3>
            <button className="text-[#3BB273] text-sm hover:text-[#2ea563]">
              Все
            </button>
          </div>

          <div className="space-y-2">
            {transactions.map((transaction) => {
              const Icon = transaction.icon;
              const isExpense = transaction.type === "expense";

              return (
                <motion.div
                  key={transaction.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTransaction(transaction.id)}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${transaction.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-slate-50 stroke-[2.5]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-slate-900 truncate">
                      {transaction.title}
                    </p>
                    <p className="text-slate-500 text-sm">
                      {transaction.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`${isExpense ? "text-slate-900" : "text-[#3BB273]"}`}
                    >
                      {isExpense ? "−" : "+"}
                      {Math.abs(
                        transaction.amount,
                      ).toLocaleString()}{" "}
                      сум
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Loyalty Program - Modern gradient card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-pink-500 p-6 shadow-xl cursor-pointer"
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-slate-50/10 to-transparent" />

          <div className="relative flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-slate-50/30">
              <Sparkles className="w-6 h-6 text-slate-50" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-50 mb-1">
                Программа лояльности
              </h3>
              <p className="text-slate-50/90 text-sm mb-4">
                Получайте кешбэк 5% на парковки и зарядки
              </p>
              <div className="flex items-center gap-3">
                <Button className="h-10 bg-slate-50 hover:bg-amber-50 text-orange-600 rounded-xl text-sm shadow-lg">
                  Подробнее
                </Button>
                <span className="text-slate-50 text-sm">
                  3 150 сум накоплено
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add Card Modal */}
      <AnimatePresence>
        {showAddCard && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddCard(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-slate-50 rounded-t-3xl p-6 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-slate-900">Добавить карту</h2>
                <button
                  onClick={() => setShowAddCard(false)}
                  className="w-10 h-10 rounded-xl bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-900 mb-2">Номер карты</label>
                  <Input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                    className="h-14 rounded-2xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-900 mb-2">Срок действия</label>
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      maxLength={5}
                      className="h-14 rounded-2xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-900 mb-2">CVV</label>
                    <Input
                      type="text"
                      placeholder="000"
                      value={cardCVV}
                      onChange={(e) => setCardCVV(e.target.value)}
                      maxLength={3}
                      className="h-14 rounded-2xl"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-blue-900 mb-1">Безопасность</p>
                      <p className="text-blue-700">
                        Данные карты защищены и не передаются третьим лицам
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleAddCard}
                  className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] text-slate-50 rounded-2xl"
                >
                  Добавить карту
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Transaction Details Modal */}
      <AnimatePresence>
        {selectedTransaction && selectedTx && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTransaction(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-slate-50 rounded-t-3xl p-6 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-slate-900">Чек операции</h2>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="w-10 h-10 rounded-xl bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Transaction Icon */}
                <div className="flex flex-col items-center justify-center py-6">
                  <div className={`w-20 h-20 rounded-2xl ${selectedTx.color} flex items-center justify-center mb-4`}>
                    {(() => {
                      const Icon = selectedTx.icon;
                      return <Icon className="w-10 h-10 text-slate-50" />;
                    })()}
                  </div>
                  <p className={`text-3xl mb-2 ${selectedTx.type === 'expense' ? 'text-slate-900' : 'text-[#3BB273]'}`}>
                    {selectedTx.type === 'expense' ? '−' : '+'}
                    {Math.abs(selectedTx.amount).toLocaleString()} сум
                  </p>
                  <p className="text-slate-600">{selectedTx.title}</p>
                </div>

                {/* Transaction Details */}
                <div className="bg-slate-100 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Дата и время</span>
                    <span className="text-slate-900">{selectedTx.date}</span>
                  </div>
                  
                  {selectedTx.location && (
                    <div className="flex justify-between py-2 border-t border-slate-200">
                      <span className="text-slate-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Адрес
                      </span>
                      <span className="text-slate-900 text-right">{selectedTx.location}</span>
                    </div>
                  )}

                  {selectedTx.details.duration && (
                    <div className="flex justify-between py-2 border-t border-slate-200">
                      <span className="text-slate-600 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Длительность
                      </span>
                      <span className="text-slate-900">{selectedTx.details.duration}</span>
                    </div>
                  )}

                  {selectedTx.details.rate && (
                    <div className="flex justify-between py-2 border-t border-slate-200">
                      <span className="text-slate-600">Тариф</span>
                      <span className="text-slate-900">{selectedTx.details.rate}</span>
                    </div>
                  )}

                  {selectedTx.details.power && (
                    <div className="flex justify-between py-2 border-t border-slate-200">
                      <span className="text-slate-600">Мощность</span>
                      <span className="text-slate-900">{selectedTx.details.power}</span>
                    </div>
                  )}

                  {selectedTx.details.method && (
                    <div className="flex justify-between py-2 border-t border-slate-200">
                      <span className="text-slate-600">Способ оплаты</span>
                      <span className="text-slate-900">{selectedTx.details.method}</span>
                    </div>
                  )}

                  <div className="flex justify-between py-2 border-t border-slate-200">
                    <span className="text-slate-600">ID транзакции</span>
                    <span className="text-slate-900 font-mono text-xs">{selectedTx.details.transactionId}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full h-12 rounded-2xl border-slate-300"
                >
                  <Receipt className="w-5 h-5 mr-2" />
                  Скачать чек
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}