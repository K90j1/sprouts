#! /usr/local/bin/ruby

require "#{File.dirname(__FILE__)}/common/api_request_module.rb"
include ApiRequest

#
#= Create and Read Session
#
#Authors::   Routeflags,Inc
#Version::   1.0 2016-03-28
#Parameters:: account_id, session_id
#License::   MIT
#

def create_session(cgi)
  session = CGI::Session.new(cgi,
                             'new_session' => true)
  session['account'] = cgi['account_id']
  session.close
  session.session_id
end

def read_existing_session(cgi)
  begin
    session = CGI::Session.new(cgi,
                               'new_session' => false,
                               'session_id' => cgi['session_id'])
    return session['account']
  rescue ArgumentError
    ApiRequest.logging('read_existing_session')
  end
  nil
end

def main
  ApiRequest.print_header
  file = 'account::' + File.basename(__FILE__)
  ApiRequest.logging("#{file}")
  cgi = CGI.new
  if (ApiRequest.is_blank? cgi['session_id']) && (ApiRequest.is_blank? cgi['account_id'])
    ApiRequest.error_message
    ApiRequest.logging("#{file}")
    exit 1
  end
  if ApiRequest.is_blank? cgi['session_id']
    ApiRequest.logging("#{file}::cgi['session_id'].blank?")
    new_session_id = create_session cgi
    result = {'session_id' => new_session_id}
    print result.to_json
    ApiRequest.logging("#{file}")
    exit 0
  end
  account_id = read_existing_session cgi
  if ApiRequest.is_blank? account_id
    ApiRequest.error_message
    ApiRequest.logging("#{LOG_MSG_4} #{file}")
    exit 1
  end
  result = {'account_id' => account_id}
  print result.to_json
  ApiRequest.logging("#{LOG_MSG_3} #{file}")
  exit 0
end

main
