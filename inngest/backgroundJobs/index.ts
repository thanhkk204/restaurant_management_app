import reservation from "@/lib/models/reservation"
import table from "@/lib/models/table"

export const updateReservedReservationsStatus = async () => {
  const now = new Date()
  const fiveMinutesLater = new Date(now.getTime() + 4.5 * 60 * 1000)

  try {
    const reservations = await reservation.find({
      startTime: { $gte: now, $lt: fiveMinutesLater },
      status: "RESERVED",
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
      { $set: { status: "ISSERVING" } }
    )

    console.log("Updated reservations and tables status to ISSERVING")
  } catch (error) {
    console.error("Error updating reservations status:", error)
  }
}

export const updateSeatedReservationsStatus = async () => {
  const now = new Date()
  const fiveMinutesLater = new Date(now.getTime() + 4.5 * 60000)

  try {
    const reservations = await reservation.find({
      endTime: { $gte: now, $lt: fiveMinutesLater },
      status: "SEATED",
    })

    const reservationIds = reservations.map((res) => res._id)
    const tableIds = reservations.map((res) => res.table_id)

    // Cập nhật trạng thái của reservations
    await reservation.updateMany(
      { _id: { $in: reservationIds } },
      { $set: { status: "ISNOTPAID" } }
    )

    // Cập nhật trạng thái của tables
    await table.updateMany(
      { _id: { $in: tableIds } },
      { $set: { status: "AVAILABLE" } }
    )

    console.log(
      "Updated reservations and tables status to ISNOTPAID and AVAILABLE"
    )
  } catch (error) {
    console.error("Error updating reservations and tables status:", error)
  }
}
export const updateReservedTable = async () => {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

  try {
    const reservations = await reservation.find({
      startTime: { $lte: oneHourLater },
      status: 'RESERVED',
    });

    const tableIds = reservations.map(res => res.table_id);

    // Cập nhật trạng thái của tables
    await table.updateMany(
      { _id: { $in: tableIds } },
      { $set: { status: 'ISBOOKED' } }
    );

    console.log('Updated tables status to RESERVED for upcoming reservations');
  } catch (error) {
    console.error('Error updating tables status:', error);
  }
}
