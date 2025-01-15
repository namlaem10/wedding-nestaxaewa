import { useTranslation } from "next-i18next";

interface FamilyMember {
  role: string;
  name: string;
  note?: string;
}

interface FamilyInfoProps {
  groomFamily: FamilyMember[];
  brideFamily: FamilyMember[];
}

export const FamilyInfo = ({ groomFamily, brideFamily }: FamilyInfoProps) => {
  const { t } = useTranslation("common");

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Groom's Family */}
            <div className="text-center">
              <h3 className="font-serif text-3xl md:text-4xl mb-10 text-gray-800">
                {t("groomFamily")}
              </h3>
              <div className="space-y-6 md:space-y-8">
                {groomFamily.map((member, index) => (
                  <div key={index} className="font-sans">
                    <p className="text-gray-600 text-base md:text-lg mb-2">
                      {member.role}
                    </p>
                    <p className="text-gray-900 text-xl md:text-2xl font-medium">
                      {member.name}
                      {member.note && (
                        <span className="text-gray-500 ml-2 text-lg md:text-xl">
                          ({member.note})
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bride's Family */}
            <div className="text-center">
              <h3 className="font-serif text-3xl md:text-4xl mb-10 text-gray-800">
                {t("brideFamily")}
              </h3>
              <div className="space-y-6 md:space-y-8">
                {brideFamily.map((member, index) => (
                  <div key={index} className="font-sans">
                    <p className="text-gray-600 text-base md:text-lg mb-2">
                      {member.role}
                    </p>
                    <p className="text-gray-900 text-xl md:text-2xl font-medium">
                      {member.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorator */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="w-full max-w-6xl px-4 flex items-center">
          <div className="h-px bg-gray-200 flex-grow" />
          <div className="mx-4 text-gray-300">💍</div>
          <div className="h-px bg-gray-200 flex-grow" />
        </div>
      </div>
    </section>
  );
};
