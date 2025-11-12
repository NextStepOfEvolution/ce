import {
  CreditCard,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  ParkingSquare,
  Zap,
  DollarSign,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";

export function Wallet() {
  const transactions = [
    {
      id: 1,
      type: "expense",
      title: "Парковка Amir Temur",
      amount: -10000,
      date: "12 ноя, 14:32",
      icon: ParkingSquare,
      color: "bg-blue-500",
    },
    {
      id: 2,
      type: "expense",
      title: "Зарядка EVpoint",
      amount: -45000,
      date: "11 ноя, 09:15",
      icon: Zap,
      color: "bg-emerald-500",
    },
    {
      id: 3,
      type: "income",
      title: "Пополнение баланса",
      amount: 200000,
      date: "10 ноя, 18:22",
      icon: DollarSign,
      color: "bg-[#3BB273]",
    },
    {
      id: 4,
      type: "expense",
      title: "Парковка Magic City",
      amount: -8000,
      date: "9 ноя, 12:45",
      icon: ParkingSquare,
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-[#3BB273] to-emerald-600 px-4 pt-12 pb-8">
        <h1 className="text-white mb-8">Кошелек</h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
          <p className="text-emerald-100 mb-2">Баланс</p>
          <h2 className="text-white mb-6">157 000 сум</h2>

          <div className="flex gap-3">
            <Button className="flex-1 h-12 bg-white hover:bg-emerald-50 text-[#3BB273] rounded-2xl">
              <Plus className="w-5 h-5 mr-2" />
              Пополнить
            </Button>
            <Button className="h-12 px-6 bg-white/20 hover:bg-white/30 text-white rounded-2xl backdrop-blur-sm border border-white/20">
              <ArrowUpRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-slate-900 mb-4">
            Платежные карты
          </h3>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white">
              <div className="flex items-center justify-between mb-8">
                <CreditCard className="w-8 h-8" />
                <span className="text-sm opacity-70">
                  Uzcard
                </span>
              </div>
              <p className="text-lg tracking-wider">
                •••• •••• •••• 4321
              </p>
            </div>

            <button className="w-full h-12 rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#3BB273] text-slate-600 hover:text-[#3BB273] flex items-center justify-center gap-2 transition-colors">
              <Plus className="w-5 h-5" />
              Добавить карту
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-slate-900 mb-4">
            Последние операции
          </h3>

          <div className="space-y-3">
            {transactions.map((transaction) => {
              const Icon = transaction.icon;
              const isExpense = transaction.type === "expense";

              return (
                <motion.div
                  key={transaction.id}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${transaction.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-slate-900 truncate">
                      {transaction.title}
                    </p>
                    <p className="text-slate-600 text-sm">
                      {transaction.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`${isExpense ? "text-slate-900" : "text-[#3BB273]"}`}
                    >
                      {isExpense ? "" : "+"}
                      {transaction.amount.toLocaleString()} сум
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 mb-1">
                Программа лояльности
              </h3>
              <p className="text-slate-700 text-sm mb-3">
                Получайте кешбэк 5% на парковки и зарядки
              </p>
              <Button className="h-10 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm">
                Подробнее
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}