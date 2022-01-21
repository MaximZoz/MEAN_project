import { Order } from "../models/Order";
import { errorHandler } from "../utils/errorHandler";
import { moment } from "moment";

export async function overview(req, res) {
  try {
    const allOrders = await Order.find({ userId: req.user.id }).sort(1);
    const ordersMap = getOrderMap(allOrders);
    const yesterdayOrders = ordersMap[moment().add(-1, "d")].format("DD.MM.YYYY") || []; //* список всех заказов которые были вчера

    const totalOrderNumber = allOrder.length; //* количество заказов
    const daysNumber = Object.keys(ordersMap).length; //* всего количество дней
    const orderPerDay = (totalOrderNumber / daysNumber).toFixed(0); //* количество заказов в день
    const yesterdayOrderNumber = yesterdayOrders.length; //* количество заказов вчера
    const totalGain = calculatePrice(allOrders); //* общая выручка

    const gainPerDay = totalGain / daysNumber; //* выручка в день
    const yesterdayGain = calculatePrice(yesterdayOrders); //* выручка за вчера

    const gainPercent = ((yesterdayGain / gainPerDay - 1) * 100).toFixed(2); //* процент выручки
    const compareGain = (yesterdayGain - gainPerDay).toFixed(2); //* сравнение выручки
    const ordersPercent = ((yesterdayOrderNumber / orderPerDay - 1) * 100).toFixed(2); //* процент для количества заказов
    const compareNumber = (yesterdayOrderNumber - orderPerDay).toFixed(2); //* сравнение количества заказов

    res.status(200).json({
      gain: {
        percent: Math.abs(+gainPercent),
        compare: Math.abs(+compareGain),
        yesterday: +yesterdayGain,
        isHigher: +gainPercent > 0,
      },
      order: {
        percent: Math.abs(+ordersPercent),
        compare: Math.abs(+compareNumber),
        yesterday: +yesterdayOrderNumber,
        isHigher: +ordersPercent > 0,
      },
    });
  } catch (e) {
    errorHandler(res, e);
  }
}

function getOrderMap(orders = []) {
  const daysOrders = {};
  orders.forEach((order) => {
    const date = moment(order.date).format("DD.MM.YYYY");
    if (date == moment().format("DD.MM.YYYY")) {
      return;
    }
    if (!daysOrders[date]) {
      daysOrders[date] = [];
    }
    return daysOrders[date].push(order);
  });
  return daysOrders;
}

function calculatePrice(orders = []) {
  return orders.reduce((total, order) => {
    const orderPrice = order.list.reduce((orderTotal, item) => {
      return (orderTotal += item.cost * item.quantity);
    }, 0);
    return (total += orderPrice);
  }, 0);
}

export function analytics(req, res) {}
