import reservation from "@/lib/models/reservation"
import table from "@/lib/models/table"

export const updateReservedReservationsStatus = async () => {
  const now = new Date()
  const beforeNow1minute = new Date(now.getTime() - 1 * 60 * 10000)
  const fiveMinutesLater = new Date(now.getTime() + 4.5 * 60 * 1000)
  try {
    const reservations = await reservation.find({
      startTime: { $gte: beforeNow1minute, $lt: fiveMinutesLater },
      status: "RESERVED",
      table_id: { $ne: null },
    })
    const reservationIds = reservations.map((res) => res._id)
    const tableIds = reservations.map((res) => res.table_id)

    // Cập nhật trạng thái của reservations
    await reservation.updateMany(
      { _id: { $in: reservationIds } },
      { $set: { status: "SEATED" } }
    )

    // Cập nhật trạng thái của tables
    await table.updateMany(
      { _id: { $in: tableIds } },
      { $set: { status: "ISSERVING" }}
    )

    console.log("Updated reservations and tables status to ISSERVING")
  } catch (error) {
    console.error("Error updating reservations status:", error)
  }
}

export const updateSeatedReservationsStatus = async () => {
  const now = new Date()
  const beforeNow1minute = new Date(now.getTime() - 1 * 60 * 10000)
  const fiveMinutesLater = new Date(now.getTime() + 4.5 * 60 * 1000)

  try {
    const reservations = await reservation.find({
      endTime: { $gte: beforeNow1minute, $lt: fiveMinutesLater },
      status: "SEATED",
      table_id: { $ne: null },
    })

    const reservationIds = reservations.map((res) => res._id)
    const tableIds = reservations.map((res) => res.table_id)

    // Cập nhật trạng thái của reservations
    await reservation.updateMany(
      { _id: { $in: reservationIds } },
      { $set: { status: "ISNOTPAID" } }
    )
    
    // Cập nhật trạng thái của tables
    const updateTableStatuses = async (tableIds: string[]) => {
      const now = new Date();
    
      for (const tableId of tableIds) {
        // Tìm reservation có trạng thái "RESERVED" trong tương lai cho table này
        const reservedReservation = await reservation.findOne({
          table_id: tableId,
          status: "RESERVED",
          startTime: { $gte: now },
        });
    
        // Cập nhật trạng thái của table dựa trên điều kiện
        const newStatus = reservedReservation ? "ISBOOKED" : "AVAILABLE";
    
        await table.updateOne(
          { _id: tableId },
          { $set: { status: newStatus } }
        );
      }
    };

    updateTableStatuses(tableIds)
    // await table.updateMany(
    //   { _id: { $in: tableIds } },
    //   { $set: { status: "AVAILABLE" } }
    // )

    console.log(
      "Updated reservations and tables status to ISNOTPAID and AVAILABLE"
    )
  } catch (error) {
    console.error("Error updating reservations and tables status:", error)
  }
}
// export const updateReservedTable = async () => {
//   const now = new Date();
//   const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

//   try {
//     const reservations = await reservation.find({
//       startTime: { $lte: oneHourLater },
//       status: 'RESERVED',
//       table_id: { $exists: true },
//     });

//     const tableIds = reservations.map(res => res.table_id);

//     // Cập nhật trạng thái của tables
//     await table.updateMany(
//       { _id: { $in: tableIds } },
//       { $set: { status: 'ISBOOKED' } }
//     );

//     console.log('Updated tables status to RESERVED for upcoming reservations');
//   } catch (error) {
//     console.error('Error updating tables status:', error);
//   }
// }
