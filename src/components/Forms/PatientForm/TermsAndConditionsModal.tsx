import {
  Button,
  FormMessage,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Label,
  DialogFooter,
  DialogClose,
} from '@/components/ui';

interface ITermsAndConditionsModal {
  fullName: string;
  dniType: string;
  dniNumber: string;
}

export const TermsAndConditionsModal = ({
  fullName = '',
  dniType = 'CC',
  dniNumber = '',
}: ITermsAndConditionsModal) => {
  return (
    <Dialog>
      <div className="grid gap-1.5 leading-none">
        <Label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          htmlFor="termsAndConditions"
        >
          Accept terms and conditions
        </Label>
        <p className="text-sm text-muted-foreground">
          You agree to our{' '}
          <DialogTrigger asChild>
            <span className="font-semibold cursor-pointer hover:text-muted-foreground/80">
              Terms of Service and Privacy Policy.
            </span>
          </DialogTrigger>
        </p>
        <FormMessage />
      </div>
      <DialogContent className="mb-4">
        <DialogHeader>
          <DialogTitle>
            CONSENTIMIENTO INFORMADO PARA LA PRACTICA DE INTERVENCIONES Y PROCEDIMIENTOS CLINICOS
            ODONTOLOGICOS
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[420px] overflow-y-auto no-scrollbar space-y-2">
          <p>
            Por medio de la presente declaración, en mi calidad de paciente, reconozco lo siguiente:
          </p>
          <ul className="list-disc list-inside ">
            <li>
              He recibido información clara y detallada sobre mi condición odontológica que afecta
              mi salud bucal.
            </li>
            <li>
              Se me ha comunicado de manera clara y detallada que la condición odontológica
              respectiva requiere el procedimiento odontológico o intervención quirúrgica
              correspondiente.
            </li>
            <li>
              Estoy plenamente informado/a acerca de los riesgos asociados con el procedimiento
              odontológico o intervención quirúrgica que se llevará a cabo. Estos riesgos incluyen,
              entre otros, complicaciones inherentes a cualquier procedimiento clínico, como el uso
              de instrumental, medicamentos, inflamación, sensibilidad, sangrado, dolor,
              adormecimiento de labios, lengua, mentón, encía y dientes, reacciones a inyecciones,
              cambios en la oclusión (mordida), espasmos en la mandíbula y músculos, dificultades en
              la articulación temporomandibular, movilidad dental, corona o puentes existentes,
              dolor referido al oído, cuello y cabeza, náuseas, vómitos, reacciones alérgicas,
              cicatrización tardía, perforación de senos maxilares, fractura de dientes, corona o
              raíz de compleja resolución.
            </li>
            <li>
              Autorizo que el procedimiento odontológico o intervención quirúrgica, así como
              cualquier procedimiento necesario para abordar situaciones imprevisibles, riesgos o
              complicaciones derivadas directa o indirectamente del procedimiento inicial, sean
              realizados por el/la doctor(a) y el personal profesional que consideren necesario.
            </li>
            <li>
              Concedo mi consentimiento para que la anestesia sea administrada por el odontólogo y
              los autorizo a utilizar el tipo de anestesia que consideren más apropiado según mi
              condición clínica y el tipo de intervención necesaria. He sido debidamente informado/a
              por el/la doctor(a) de odontología sobre los riesgos asociados con la aplicación de
              anestesia, según consta en mi historia clínica.
            </li>
            <li>
              Me comprometo a seguir las indicaciones del profesional y del personal de odontología
              en cuanto a los cuidados pre y post procedimiento, con el fin de restablecer mi salud
              bucal. Asimismo, cumpliré con las citas odontológicas, prescripciones, dietas,
              instrucciones y controles periódicos.
            </li>
            <li>
              Asumo la responsabilidad de cubrir el costo total de los servicios de salud oral. En
              testimonio de lo anterior, suscribo el presente documento a los {new Date().getDate()}{' '}
              días del mes de{' '}
              <span className="capitalize">
                {new Date().toLocaleString('es-ES', { month: 'long' })}
              </span>{' '}
              del año {new Date().getFullYear()}.
            </li>
            <li>
              Autorizo el uso de mi información personal y clínica para fines de diagnóstico,
              tratamiento, seguimiento y control de calidad, así como para la realización de
              estudios científicos, estadísticos, epidemiológicos y de investigación, de acuerdo con
              lo establecido en la normativa vigente sobre protección de datos personales.
            </li>
            <li>
              Autorizo la toma de fotografías, radiografías, modelos y cualquier otro tipo de
              registro clínico necesario para el diagnóstico, tratamiento y seguimiento de mi salud
              bucal. Estos registros serán almacenados en mi historia clínica y podrán ser
              utilizados con fines de diagnóstico, tratamiento, seguimiento y control de calidad,
              así como para la realización de estudios científicos, estadísticos, epidemiológicos y
              de investigación, de acuerdo con lo establecido en la normativa vigente sobre
              protección de datos personales.
            </li>
            <li>
              Yo <span className="font-semibold capitalize"> {fullName}</span>, identificado/a con{' '}
              <span className="font-semibold">
                {dniType}. {dniNumber}
              </span>{' '}
              certifico que la información consignada es verídica y que no estoy omitiendo
              informaciónque ponga en riesgo mi salud, ni la de otros. Además, me comprometo a
              informar al profesional de odontología sobre cualquier cambio en mi estado de salud
              durante el tratamiento.
            </li>
          </ul>
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
