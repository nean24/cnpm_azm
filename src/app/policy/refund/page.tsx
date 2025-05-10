
import { MainLayout } from '@/components/layout/main-layout';
import { PageTitle } from '@/components/shared/page-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RefundPolicyPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <PageTitle title="Chính Sách Hoàn Vé" />
        <Card className="prose prose-lg max-w-4xl mx-auto dark:prose-invert p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Quy định về hoàn vé tại Amazing Cinema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <section>
              <h2 className="text-xl font-semibold">1. Trường hợp được hoàn vé</h2>
              <p>Amazing Cinema hỗ trợ hoàn vé trong các trường hợp sau:</p>
              <ul>
                <li>Suất chiếu bị hủy hoặc thay đổi lịch chiếu bởi rạp mà không có thông báo trước phù hợp.</li>
                <li>Lỗi kỹ thuật từ hệ thống của Amazing Cinema khiến giao dịch không thành công nhưng tài khoản của bạn vẫn bị trừ tiền.</li>
                <li>Vé mua trực tuyến không thể sử dụng do lỗi từ phía rạp (ví dụ: trùng ghế, sai thông tin phim).</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold">2. Trường hợp không được hoàn vé</h2>
              <ul>
                <li>Khách hàng mua nhầm vé, chọn sai suất chiếu, sai rạp, hoặc sai loại vé.</li>
                <li>Khách hàng không đến xem phim theo lịch đã đặt.</li>
                <li>Vé đã được check-in tại rạp.</li>
                <li>Yêu cầu hoàn vé sau thời gian quy định (thường là trước giờ chiếu phim một khoảng thời gian nhất định, sẽ được thông báo cụ thể khi đặt vé).</li>
              </ul>
            </section>
             <section>
              <h2 className="text-xl font-semibold">3. Quy trình yêu cầu hoàn vé</h2>
              <p>Để yêu cầu hoàn vé, vui lòng liên hệ bộ phận Chăm sóc Khách hàng của Amazing Cinema qua hotline 0898 305 765 hoặc email DH52200848@student.stu.edu.vn, cung cấp các thông tin sau:</p>
              <ul>
                <li>Mã đặt vé (Booking ID).</li>
                <li>Thông tin suất chiếu (tên phim, rạp, giờ chiếu, ngày chiếu).</li>
                <li>Lý do yêu cầu hoàn vé.</li>
                <li>Thông tin tài khoản ngân hàng hoặc ví điện tử để nhận tiền hoàn (nếu được chấp thuận).</li>
              </ul>
              <p>Chúng tôi sẽ xem xét yêu cầu của bạn trong vòng 24-48 giờ làm việc.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold">4. Thời gian hoàn tiền</h2>
              <p>Nếu yêu cầu hoàn vé được chấp thuận, thời gian hoàn tiền có thể từ 3-7 ngày làm việc tùy thuộc vào ngân hàng hoặc đơn vị cung cấp dịch vụ thanh toán.</p>
            </section>
             <p className="mt-6 italic">Amazing Cinema có quyền thay đổi chính sách hoàn vé mà không cần báo trước. Vui lòng kiểm tra kỹ thông tin trước khi đặt vé.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
