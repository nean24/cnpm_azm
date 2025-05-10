
import { MainLayout } from '@/components/layout/main-layout';
import { PageTitle } from '@/components/shared/page-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <PageTitle title="Chính Sách Bảo Mật" />
        <Card className="prose prose-lg max-w-4xl mx-auto dark:prose-invert p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Bảo vệ thông tin cá nhân của bạn</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <section>
              <h2 className="text-xl font-semibold">1. Mục đích thu thập thông tin</h2>
              <p>Amazing Cinema thu thập thông tin cá nhân của bạn cho các mục đích sau:</p>
              <ul>
                <li>Xử lý đặt vé và thanh toán.</li>
                <li>Cung cấp thông tin về các suất chiếu, chương trình khuyến mãi và sự kiện của rạp.</li>
                <li>Cải thiện chất lượng dịch vụ và trải nghiệm người dùng.</li>
                <li>Hỗ trợ khách hàng và giải quyết các vấn đề phát sinh.</li>
                <li>Tuân thủ các yêu cầu pháp lý.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold">2. Phạm vi thông tin thu thập</h2>
              <p>Chúng tôi có thể thu thập các thông tin sau:</p>
              <ul>
                <li>Thông tin cá nhân: Họ tên, số điện thoại, địa chỉ email.</li>
                <li>Thông tin giao dịch: Lịch sử đặt vé, thông tin thanh toán (được mã hóa và xử lý bởi các cổng thanh toán uy tín).</li>
                <li>Thông tin kỹ thuật: Địa chỉ IP, loại trình duyệt, thông tin thiết bị, cookie (nếu bạn đồng ý).</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold">3. Bảo mật thông tin</h2>
              <p>Amazing Cinema cam kết bảo vệ thông tin cá nhân của bạn. Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để ngăn chặn truy cập, sử dụng hoặc tiết lộ thông tin trái phép.</p>
              <p>Thông tin thanh toán của bạn được xử lý qua các cổng thanh toán tuân thủ tiêu chuẩn PCI DSS và không được lưu trữ trực tiếp trên hệ thống của chúng tôi.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold">4. Chia sẻ thông tin</h2>
              <p>Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba trừ các trường hợp:</p>
              <ul>
                <li>Được sự đồng ý của bạn.</li>
                <li>Cho các đối tác xử lý thanh toán để hoàn tất giao dịch.</li>
                <li>Theo yêu cầu của cơ quan nhà nước có thẩm quyền.</li>
                <li>Để bảo vệ quyền lợi hợp pháp của Amazing Cinema.</li>
              </ul>
            </section>
             <section>
              <h2 className="text-xl font-semibold">5. Quyền của bạn</h2>
              <p>Bạn có quyền truy cập, sửa đổi hoặc yêu cầu xóa thông tin cá nhân của mình. Vui lòng liên hệ với chúng tôi nếu bạn có bất kỳ yêu cầu nào liên quan đến thông tin cá nhân.</p>
            </section>
            <p className="mt-6 italic">Chính sách bảo mật này có thể được cập nhật theo thời gian. Các thay đổi sẽ được thông báo trên website của chúng tôi.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
