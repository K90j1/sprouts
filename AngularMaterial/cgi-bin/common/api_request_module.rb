ENV['GEM_HOME'] = "#{File.dirname(__FILE__)}/../vendor/bundle/ruby/2.0.0"

require 'rubygems'
require 'cgi'
require 'json'
require 'logger'
require 'cgi/session'

RESPONSE_HEADER = <<-EOS.freeze
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With
Content-Type: application/json

EOS
LOG_PATH = "#{File.dirname(__FILE__)}/../log/cgi.log".freeze

#
#= Api Request
#
# Authors::   Routeflags,Inc
# Version::   1.0 2016-03-28
# License::   MIT
#

module ApiRequest
  def self.is_blank?(value)
    return true if value.nil?
    return true if value.empty?
    false
  end

  def self.logging(message)
    @log = Logger.new(LOG_PATH, 'daily')
    @log.level = Logger::DEBUG
    @log.debug(message)
  end

  def self.print_header
    print RESPONSE_HEADER
  end

  def self.error_message
    error_message = { 'message' => 'error' }
    print error_message.to_json
  end
end
